import { Get, Body, Patch, Param, ParseIntPipe, UseGuards, UploadedFile } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUser } from './interfaces/users.interface';
import { ApiGetUserById } from './decorators/get-user-by-id.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ControllerDecorator } from '../../shared/decorators/controller.decorator';
import { ApiDeleteUser } from './decorators/delete-user.decorator';
import { ApiUpdateUser } from './decorators/update-user.decorator';
import { AuthGuard } from 'shared/guards/jwt.guards';
import { CurrentUserId } from 'shared/decorators/current-user.decorator';
import { ApiUploadImage } from 'shared/decorators/api-upload-image.decorator';
import { UploadImage } from 'shared/decorators/upload-images.decorator';

@ControllerDecorator('users')
@ApiBearerAuth('auth')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiGetUserById()
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<IUser> {
    const result = await this.usersService.findById(id);
    return result;
  }

  @ApiUpdateUser()
  @Patch(':id')
  @UseGuards(AuthGuard)
  async update(@CurrentUserId() userId, @Body() dto: UpdateUserDto): Promise<IUser> {
    const user = await this.usersService.update(userId, dto);
    return user;
  }

  @ApiDeleteUser()
  @Patch('delete/:id')
  @UseGuards(AuthGuard)
  async deleteUser(@CurrentUserId() userId, @Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.usersService.remove(userId, id);
  }

  @ApiUploadImage()
  @Patch('avatar/:id')
  @UploadImage()
  @UseGuards(AuthGuard)
  async updateAvatar(@UploadedFile() file: Express.Multer.File, @CurrentUserId() userId) {
    const result = await this.usersService.updateAvatar(userId, file);
    return result;
  }
}
