import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { IUpdateUser, IUser } from './interfaces/users.interface';
import { UserRepository } from './users.repository';
import { UploadService } from 'modules/upload/upload.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly uploadService: UploadService,
  ) {}

  async findById(id: string): Promise<IUser> {
    const user = await this.userRepository.findUserById(id);
    if (!user) {
      throw new NotFoundException(`Пользователь ${id} не найден`);
    }

    if (user && !user.isVerified) {
      throw new NotFoundException(`Почта пользователя не была подтверждена при регистрации.`);
    }

    return user;
  }

  async update(userId: string, dto: IUpdateUser): Promise<IUser> {
    const user = await this.findById(userId);

    if (user.id !== userId) {
      throw new ForbiddenException('Вы не можете редактировать чужой профиль');
    }

    if (dto.username && await this.userRepository.findUsername(dto.username)) {
      throw new ConflictException('Пользователь с таким username уже существует.');
    }

    const updatedUser = {
      ...user,
      ...dto,
      id: user.id,
      updatedAt: new Date(),
    };
    await this.userRepository.update(updatedUser);
    return updatedUser;
  }

  public async remove(userId: string): Promise<void> {
    const user = await this.findById(userId);

    const deletedUser = {
      ...user,
      id: userId,
      isDeleted: true,
      updatedAt: new Date(),
    };
    await this.userRepository.update(deletedUser);
  }

  async updateAvatar(userId: string, file: Express.Multer.File) {
    const user = await this.findById(userId);
    const image = await this.uploadService.uploadSingleImage(file);

    user.avatarUrl = image.secure_url;
    await this.userRepository.update(user);

    return { avatarUrl: user.avatarUrl };
  }
}
