import { Module } from '@nestjs/common';
import { ConfigModule } from './configs/config.module';

@Module({
  imports: [ConfigModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
