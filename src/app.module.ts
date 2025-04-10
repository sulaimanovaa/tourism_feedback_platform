import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { DbConfig } from './configs/db.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from './configs/config.module';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useExisting: DbConfig,
    }),
    UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
