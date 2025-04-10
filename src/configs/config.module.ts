import { Global, Module } from '@nestjs/common';
import { ConfigModule as NestModule } from '@nestjs/config';
import { AppConfig } from './app.config';
import { ConfigService } from './config.service';
import { DbConfig } from './db.config';

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
    DbConfig,
  ],
  exports: [
    ConfigService,
    AppConfig,
    DbConfig,
  ],
})
export class ConfigModule {
}
