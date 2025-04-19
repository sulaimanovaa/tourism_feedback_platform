import { ApiProperty } from '@nestjs/swagger';
import { ILogin } from '../interfaces/auth.interface';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDto implements ILogin {
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
  password: string;
}
