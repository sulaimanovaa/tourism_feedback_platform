import { ApiProperty } from '@nestjs/swagger';
import { IReset } from '../interfaces/auth.interface';
import { IsString } from 'class-validator';
import { IsPasswordComplex } from 'shared/validators/is-password-complex.validator';
import { DtoMessages } from 'shared/messages/dto.messages';

export class ResetPasswordDto implements IReset {
  @ApiProperty({
    description: 'новый пароль',
    required: true,
  })
  @IsString()
  @IsPasswordComplex({ message: DtoMessages.isPasswordValid })
  newPassword: string;

  @ApiProperty({
    description: 'повторите пароль',
    required: true,
  })
  @IsString()
  confirmPassword: string;
}
