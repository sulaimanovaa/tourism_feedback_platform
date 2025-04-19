import { Post, Body, Query, UseGuards, Req, Patch } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { AuthGuard } from '../../shared/guards/jwt.guards';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { LoginDto } from './dto/login.dto';
import { ControllerDecorator } from '../../shared/decorators/controller.decorator';
import { ApiRegisterUser } from './decorators/register.decorator';
import { ApiLogin } from './decorators/login.decorator';
import { ApiVerifyEmail } from './decorators/verify-email.decorator';
import { ApiForgotPassword } from './decorators/forgot-password.decorator';
import { ApiChangePassword } from './decorators/change-password.decorator';
import { ApiResetPassword } from './decorators/reset-password.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';

@ControllerDecorator('auth')
@ApiBearerAuth('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiRegisterUser()
  @Post('register')
  async register(@Body() dto: RegisterDto) {
    const result = await this.authService.register(dto);
    return result;
  }

  @ApiLogin()
  @Post('login')
  async login(@Body() credentials: LoginDto) {
    const result = await this.authService.login(credentials);
    return result;
  }

  @ApiVerifyEmail()
  @Post('verify-email')
  async verifyEmail(@Query('token') token: string) {
    const result = this.authService.verifyEmail(token);
    return result;
  }

  @ApiForgotPassword()
  @Post('forgot-password')
  async forgotPassword(@Body() dto: ForgotPasswordDto) {
    await this.authService.requestPasswordReset(dto);
    return { message: 'Инструкции по восстановлению пароля отправлены на email' };
  }

  @ApiChangePassword()
  @UseGuards(AuthGuard)
  @Patch('change-password')
  async changePassword(@Body() dto: ChangePasswordDto, @Req() req) {
    await this.authService.changePassword(req.user.email, dto);
    return { message: 'Пароль успешно изменен' };
  }

  @ApiResetPassword()
  @Post('reset-password')
  async resetPassword(
    @Query('token') token: string,
    @Query('id') id: number,
    @Body() dto: ResetPasswordDto,
  ) {
    await this.authService.resetPassword(token, id, dto);
    return { message: 'Пароль успешно изменен' };
  }
}
