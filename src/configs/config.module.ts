import { Global, Module } from '@nestjs/common';
import { ConfigModule as NestModule } from '@nestjs/config';
import { AppConfig } from './app.config';
import { ConfigService } from './config.service';

@Global()
@Module({
  imports: [
    NestModule.forRoot({
      envFilePath: [
        '.env.local',
        '.env',
      ],
    }),
  ],
  providers: [
    ConfigService,
    AppConfig,
  ],
  exports: [
    AppConfig,
  ],
})
export class ConfigModule {
}
