import { Post, Body, Query, UseGuards, Req, Patch } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { AuthGuard } from '../../shared/guards/jwt.guards';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { LoginDto } from './dto/login.dto';
import { ControllerDecorator } from '../../shared/decorators/controller.decorator';
import { ApiRegisterUser } from './decorators/register.decorator';
import { ApiLogin } from './decorators/login.decorator';
import { ApiVerifyEmail } from './decorators/verify-email.decorator';
import { ApiForgotPassword } from './decorators/forgot-password.decorator';
import { ApiChangePassword } from './decorators/change-password.decorator';
import { ApiResetPassword } from './decorators/reset-password.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';
import { IOutputMessage } from './interfaces/auth.interface';

@ControllerDecorator('auth')
@ApiBearerAuth('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiRegisterUser()
  @Post('register')
  async register(@Body() dto: RegisterDto): Promise<IOutputMessage> {
    await this.authService.register(dto);
    return { message: 'Ссылка для подтверждения отправлена на email' };
  }

  @ApiLogin()
  @Post('login')
  async login(@Body() credentials: LoginDto) {
    const result = await this.authService.login(credentials);
    return result;
  }

  @ApiVerifyEmail()
  @Patch('verify-email')
  async verifyEmail(@Query('token') token: string): Promise<IOutputMessage> {
    await this.authService.verifyEmail(token);
    return { message: 'Почта успешно подтверждена' };
  }

  @ApiForgotPassword()
  @Post('forgot-password')
  async forgotPassword(@Body() dto: ForgotPasswordDto): Promise<IOutputMessage> {
    await this.authService.requestPasswordReset(dto);
    return { message: 'Инструкции по восстановлению пароля отправлены на email' };
  }

  @ApiChangePassword()
  @UseGuards(AuthGuard)
  @Patch('change-password')
  async changePassword(@Body() dto: ChangePasswordDto, @Req() req): Promise<IOutputMessage> {
    await this.authService.changePassword(req.user.email, dto);
    return { message: 'Пароль успешно изменен' };
  }

  @ApiResetPassword()
  @Patch('reset-password')
  async resetPassword(
    @Query('token') token: string,
    @Query('id') id: string,
    @Body() dto: ResetPasswordDto,
  ): Promise<IOutputMessage> {
    await this.authService.resetPassword(token, id, dto);
    return { message: 'Пароль успешно изменен' };
  }
}
