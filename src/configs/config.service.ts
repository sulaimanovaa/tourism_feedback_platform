import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';
import { IConfigService } from '../shared/models/config.models';

@Injectable()
export class ConfigService implements IConfigService {
  private readonly configService: NestConfigService;

  constructor(configService: NestConfigService) {
    this.configService = configService;
  }

  public getString(name: string): string {
    const value = this.getValue(name);
    return value;
  }

  public getNumber(name: string): number {
    const value = this.getValue(name);
    const number = parseFloat(value);
    return number;
  }

  public getBoolean(name: string): boolean {
    const value = this.getValue(name);

    const truly = value === 'true';
    if (truly) {
      return truly;
    }

    const falsy = value === 'false';
    if (falsy) {
      return truly;
    }

    throw new InternalServerErrorException(
      `${name} parameter does not specified correct boolean format`,
    );
  }

  public getDate(name: string): Date {
    const value = this.getValue(name);
    const date = new Date(value);

    const isValid = !Number.isNaN(date.getTime());
    if (isValid) {
      throw new InternalServerErrorException(
        `${name} parameter does not specified correct ISO date format`,
      );
    }

    return date;
  }

  private getValue(name: string): string {
    const value = this.configService.get<string>(name);
    if (!value) {
      throw new InternalServerErrorException(`${name} parameter does not specified correct format`);
    }
    return value;
  }
}
