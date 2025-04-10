import { IsEmail, IsEnum, IsOptional, IsString, MinLength } from "class-validator";
import { ICreateUser, UserTypes } from "../interfaces/user.models";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateUserDto implements ICreateUser {
  @ApiProperty({
    description: 'почта',
    required: true,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'пароль',
    required: true,
  })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({
    description: 'Имя профиля',
    required: true,
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Тип аккаунта',
    enum: UserTypes,
  })
  @IsEnum(UserTypes)
  type: UserTypes;
}