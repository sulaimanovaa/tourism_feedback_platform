import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { IListResponse } from 'src/shared/models/pagination.models';
import { IUpdateUser, IUser } from './interfaces/user.models';
import { UserRepository } from './users.repository';
import { PageOptionsDto } from './dto/page-options.dto copy';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(dto: CreateUserDto): Promise<IUser> {
    const userExist = await this.userRepository.findUserByEmail(dto.email);
    if (userExist) {
      throw new NotFoundException(`Указанная почта уже зарегистрирована`);
    }

    const user = await this.userRepository.create(dto);
    return user;
  }

  async findAllCompanies(query: PageOptionsDto): Promise<IListResponse<IUser>> {
    const result = await this.userRepository.findAllCompanies(query);
    return result;
  }

  async findById(id: number): Promise<IUser> {
    const user = await this.userRepository.findUserById(id);
    if (!user) {
      throw new NotFoundException(`Пользователь ${id} не найден`);
    }

    return user;
  }

  async update(dto: IUpdateUser): Promise<IUser> {
    const user = await this.findById(dto.id);
    const updatedUser = {
      ...user,
      ...dto,
      id: user.id,
      updatedAt: new Date(),
    }
    await this.userRepository.update(updatedUser);
    return updatedUser;
  }

  public async remove(id: number): Promise<void> {
    const user = await this.findById(id);
    const deletedUser = {
      ...user,
      id: user.id,
      isDeleted: true,
      updatedAt: new Date(),
    };
    await this.userRepository.update(deletedUser);
  }

  async reset(email: string): Promise<void> {
    const user = await this.userRepository.findDeletedUserByEmail(email);
    if (!user) {
      throw new NotFoundException('Пользователь не найден в архиве');
    }

    const resetUser = {
      ...user,
      id: user.id,
      isDeleted: false,
      updatedAt: new Date(),
    };
    await this.userRepository.update(resetUser);
  }
}
