import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import * as crypto from 'crypto';
import * as bcrypt from 'bcrypt';
import { MailService } from '../mail/mail.service';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { IUser } from '../users/interfaces/users.interface';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { generateRandomNickname } from './utils/nickname.utils';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private mailService: MailService,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto): Promise<void> {
    const existingUser = await this.authRepository.findUserByEmail(dto.email);

    if (existingUser && !existingUser.isVerified) {
      await this.sendVerificationEmail(existingUser);
      throw new BadRequestException('Почта не подтверждена. Новое письмо отправлено.');
    }

    if (existingUser && existingUser.isVerified) {
      throw new ConflictException('Пользователь с таким email уже существует.');
    }

    const username = generateRandomNickname(dto.email);
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = await this.authRepository.createUser({
      ...dto,
      username,
      password: hashedPassword,
      isVerified: false,
    });

    await this.sendVerificationEmail(user);
  }

  async verifyEmail(token: string) {
    try {
      const payload = await this.jwtService.verify(token, {
        secret: process.env.EMAIL_VERIFICATION_SECRET,
      });

      const user = await this.authRepository.findUserByEmail(payload.email);
      if (!user) {
        throw new NotFoundException('Пользователь не найден');
      }

      if (user.isVerified) {
        return { message: 'Почта уже подтверждена' };
      }

      user.isVerified = true;
      await this.authRepository.updateUser(user);
    } catch (err) {
      throw new BadRequestException('Неверный или истёкший токен');
    }
  }

  async requestPasswordReset(dto: ForgotPasswordDto): Promise<void> {
    const user = await this.authRepository.findUserByEmail(dto.email);
    if (!user) {
      throw new NotFoundException('Пользователь с таким email не найден');
    }

    const lastRequest = await this.authRepository.findLastPassword(user.id);
    if (lastRequest && this.isRequestTooFrequent(lastRequest.createdAt)) {
      throw new BadRequestException('Слишком много запросов на сброс пароля. Попробуйте позже');
    }

    await this.authRepository.removePreviousTokens(user.id);

    const rawToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = await bcrypt.hash(rawToken, 10);
    const expirationDate = new Date(Date.now() + 30 * 60 * 1000);

    const savedToken = await this.authRepository.saveToken({
      token: hashedToken,
      user,
      expirationDate,
    });

    await this.mailService.sendPasswordResetEmail({
      to: user.email,
      token: rawToken,
      id: savedToken.id,
    });
  }

  async resetPassword(token: string, id: string, dto: ResetPasswordDto): Promise<void> {
    if (dto.newPassword !== dto.confirmPassword) {
      throw new BadRequestException('Пароли не совпадают');
    }

    const validToken = await this.authRepository.findToken(id);
    if (!validToken) {
      throw new BadRequestException('Недействительный токен');
    }

    const isValid = await bcrypt.compare(token, validToken.token);
    if (!isValid || validToken.expirationDate < new Date()) {
      throw new BadRequestException('Срок действия токена истек или токен недействителен');
    }

    const user = validToken.user;
    user.password = await bcrypt.hash(dto.newPassword, 10);

    await this.authRepository.updateUser(user);
    await this.authRepository.removePreviousTokens(user.id);
  }

  async login(dto: LoginDto): Promise<{ accessToken: string }> {
    const user = await this.authRepository.findUserByEmail(dto.email);

    if (!user) {
      throw new NotFoundException('Неверная почта или пароль.');
    }

    if (!user.isVerified) {
      await this.sendVerificationEmail(user);
      throw new BadRequestException('Email не подтверждён. Мы отправили новую ссылку.');
    }

    if (user && user.isDeleted) {
      await this.authRepository.activateUser(user.id);
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) {
      throw new BadRequestException('Неверная почта или пароль.');
    }

    const payload = { sub: user.id, email: user.email };
    const accessToken = await this.jwtService.signAsync(payload);

    return { accessToken };
  }

  async sendVerificationEmail(user: IUser): Promise<void> {
    const token = await this.jwtService.signAsync(
      { userId: user.id, email: user.email },
      {
        secret: process.env.EMAIL_VERIFICATION_SECRET,
        expiresIn: '15m',
      },
    );

    await this.mailService.sendVerificationLink({
      to: user.email,
      token,
    });
  }

  async changePassword(email: string, dto: ChangePasswordDto): Promise<void> {
    const user = await this.authRepository.findUserByEmail(email);
    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }

    const isPasswordValid = await bcrypt.compare(dto.oldPassword, user.password);
    if (!isPasswordValid) {
      throw new BadRequestException('Неверный текущий пароль');
    }

    if (dto.oldPassword === dto.newPassword) {
      throw new BadRequestException('Новый пароль не должен совпадать с текущим');
    }

    user.password = await bcrypt.hash(dto.newPassword, 10);
    await this.authRepository.updateUser(user);
  }

  private isRequestTooFrequent(lastRequestDate: Date): boolean {
    const limitInMilliseconds = 5 * 60 * 1000;
    return new Date().getTime() - new Date(lastRequestDate).getTime() < limitInMilliseconds;
  }
}
