import { ApiProperty } from '@nestjs/swagger';
import { IChangePassword } from '../interfaces/auth.interface';
import { IsString } from 'class-validator';
import { IsPasswordComplex } from 'shared/validators/is-password-complex.validator';
import { DtoMessages } from 'shared/messages/dto.messages';

export class ChangePasswordDto implements IChangePassword {
  @ApiProperty({
    description: 'пароль',
    required: true,
  })
  @IsString()
  oldPassword: string;

  @ApiProperty({
    description: 'пароль',
    required: true,
  })
  @IsString()
  @IsPasswordComplex({ message: DtoMessages.isPasswordValid })
  newPassword: string;
}
