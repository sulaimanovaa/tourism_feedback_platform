import { ApiProperty } from '@nestjs/swagger';
import { IRegistUser } from '../interfaces/auth.interface';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';
import { DtoMessages } from 'shared/messages/dto.messages';
import { IsPasswordComplex } from 'shared/validators/is-password-complex.validator';

export class RegisterDto implements IRegistUser {
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
  @IsPasswordComplex({ message: DtoMessages.isPasswordValid })
  password: string;

  @ApiProperty({
    description: 'Имя',
    required: true,
  })
  @IsString()
  @MinLength(3, { message: DtoMessages.minLength })
  @MaxLength(40, { message: DtoMessages.maxLength })
  name: string;
}
