import { v2 as cloudinary } from 'cloudinary';
import { ConfigService } from '../../configs/config.service';

export const CloudinaryProvider = {
  provide: 'CLOUDINARY',
  useFactory: (configService: ConfigService) => {
    cloudinary.config({
      cloud_name: configService.getString('CLOUDINARY_NAME'),
      api_key: configService.getString('CLOUDINARY_API_KEY'),
      api_secret: configService.getString('CLOUDINARY_API_SECRET'),
    });
    return cloudinary;
  },
  inject: [ConfigService],
};
