import * as nodemailer from 'nodemailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from 'configs/config.service';
import { IMailParams } from './interfaces/mail.interfaces';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.getString('SMTP_HOST'),
      port: this.configService.getNumber('SMTP_PORT'),
      secure: this.configService.getString('SMTP_SECURE') === 'true',
      auth: {
        user: this.configService.getString('SMTP_USER'),
        pass: this.configService.getString('SMTP_PASS'),
      },
    });
  }

  private async sendEmail(mailOptions: nodemailer.SendMailOptions) {
    try {
      await this.transporter.sendMail(mailOptions);
      console.log(`Письмо отправлено на: ${mailOptions.to}`);
    } catch (error) {
      console.error(`Не удалось отправить письмо на ${mailOptions.to}: ${error.message}`);
      throw new Error('Ошибка при отправке письма');
    }
  }

  async sendPasswordResetEmail(props: IMailParams) {
    const resetUrl = this.configService.getString('AUTH_RESET_URL');
    const resetLink = this.buildLink(resetUrl, {
      id: props.id.toString(),
      token: props.token,
    });

    const mailOptions = {
      from: this.configService.getString('SMTP_USER'),
      to: props.to,
      subject: 'Восстановление пароля',
      text: `Перейдите по следующей ссылке, чтобы сбросить ваш пароль: ${resetLink}`,
    };

    await this.sendEmail(mailOptions);
  }

  async sendVerificationLink(props: IMailParams) {
    const verifyUrl = this.configService.getString('AUTH_VERIFY_URL');
    const verificationLink = this.buildLink(verifyUrl, { token: props.token });

    const mailOptions = {
      from: this.configService.getString('SMTP_USER'),
      to: props.to,
      subject: 'Ссылка для подтверждения email',
      text: `Пожалуйста, подтвердите свой email, перейдя по следующей ссылке: ${verificationLink}`,
    };

    await this.sendEmail(mailOptions);
  }

  private buildLink(baseUrl: string, params: Record<string, string>): string {
    const url = new URL(baseUrl);
    for (const [key, value] of Object.entries(params)) {
      url.searchParams.set(key, value);
    }
    return url.toString();
  }
}
