import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConfigService } from './config.service';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

@Injectable()
export class DbConfig implements TypeOrmOptionsFactory {
  public readonly dbHost: string;
  public readonly dbPort: number;
  public readonly dbUsername: string;
  public readonly dbPassword: string;
  public readonly dbDatabase: string;
  public readonly dbSynchronize: boolean;
  public readonly dbMigrationsRun: boolean;

  constructor(configService: ConfigService) {
    this.dbHost = configService.getString('DB_HOST');
    this.dbPort = configService.getNumber('DB_PORT');
    this.dbUsername = configService.getString('DB_USERNAME');
    this.dbPassword = configService.getString('DB_PASSWORD');
    this.dbDatabase = configService.getString('DB_DATABASE');
    this.dbMigrationsRun = configService.getBoolean('DB_MIGRATIONS_RUN');
  }

  createTypeOrmOptions(): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> {
    return {
      type: 'postgres',
      host: this.dbHost,
      port: this.dbPort,
      username: this.dbUsername,
      password: this.dbPassword,
      database: this.dbDatabase,
      entities: [`${__dirname}/../**/*.entity.js`],
      synchronize: true,
      migrationsRun: this.dbMigrationsRun,
      namingStrategy: new SnakeNamingStrategy(),
    };
  }
}
