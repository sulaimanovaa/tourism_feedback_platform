import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { DbConfig } from './configs/db.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from './configs/config.module';
import { ReviewsModule } from './modules/reviews/reviews.module';
import { ServicesModule } from './modules/services/services.module';
import { FollowsModule } from './modules/follows/follows.module';
import { AuthModule } from './modules/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from './configs/config.service';
import { ReviewLikeModule } from './modules/review-like/review-like.module';
import { SavedServiceModule } from './modules/saved-service/saved-service.module';
import { UploadModule } from './modules/upload/upload.module';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useExisting: DbConfig,
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        secret: config.getString('JWT_SECRET'),
        signOptions: { expiresIn: config.getString('JWT_EXPIRES_IN') },
      }),
      global: true,
      inject: [ConfigService],
    }),
    UsersModule,
    ReviewsModule,
    ServicesModule,
    FollowsModule,
    AuthModule,
    ReviewLikeModule,
    SavedServiceModule,
    UploadModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
