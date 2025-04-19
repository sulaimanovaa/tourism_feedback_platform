import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class ForgotPasswordDto {
  @ApiProperty({
    description: 'почта',
    required: true,
  })
  @IsEmail()
  email: string;
}
