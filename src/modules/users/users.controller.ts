import { Get, Post, Body, Patch, Param, ParseIntPipe, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IListResponse } from 'src/shared/models/pagination.models';
import { IUser } from './interfaces/user.models';
import { ApiGetUserById } from './decorators/get-user-by-id.decorator';
import { ApiGetListUsers } from './decorators/get-list-users.decorator';
import { ApiTags } from '@nestjs/swagger';
import { ControllerDecorator } from 'src/shared/decorators/controller.decorator';
import { ApiDeleteUser } from './decorators/delete-user.decorator';
import { PageOptionsDto } from './dto/page-options.dto copy';
import { ApiCreateUser } from './decorators/create-user.decorator';
import { ApiUpdateUser } from './decorators/update-user.decorator';
import { ApiResetUser } from './decorators/reset-user.decorator';

@ApiTags('user-constroller')
@ControllerDecorator('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiCreateUser()
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<IUser> {
    const user = await this.usersService.create(createUserDto);
    return user;
  }

  @ApiGetListUsers()
  @Get()
  async findAllCompanies(
    @Query() pageOptionsDto: PageOptionsDto,
  ): Promise<IListResponse<IUser>> {
    const users = await this.usersService.findAllCompanies(pageOptionsDto);
    return users;
  }

  @ApiGetUserById()
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<IUser> {
    const result = await this.usersService.findById(id);
    return result;
  }

  @ApiUpdateUser()
  @Patch(':id')
  async update(
    @Body() updateUserDto: UpdateUserDto
  ): Promise<IUser> {
    const user = await this.usersService.update(updateUserDto);
    return user;
  }

  @ApiDeleteUser()
  @Patch('delete/:id')
  async deleteUser(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.usersService.remove(id);
  }

  @ApiResetUser()
  @Patch('reset/:id')
  async resetUser(@Param('email') email: string): Promise<void> {
    await this.usersService.reset(email);
  }
}
