import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { v2 as CloudinaryType, UploadApiResponse } from 'cloudinary';
import { validateImage } from './utils/upload.utils';

@Injectable()
export class UploadService {
  constructor(@Inject('CLOUDINARY') private cloudinary: typeof CloudinaryType) {}

  async uploadSingleImage(file: Express.Multer.File): Promise<UploadApiResponse> {
    validateImage(file);

    return new Promise((resolve, reject) => {
      this.cloudinary.uploader
        .upload_stream({ resource_type: 'image' }, (error, result) => {
          if (error) return reject(error);
          resolve(result);
        })
        .end(file.buffer);
    });
  }

  async uploadMultipleImages(
    files: Express.Multer.File[],
    maxCount = 3,
  ): Promise<UploadApiResponse[]> {
    if (files.length > maxCount) {
      throw new BadRequestException(`Можно загрузить не более ${maxCount} фото`);
    }

    return Promise.all(files.map((file) => this.uploadSingleImage(file)));
  }

  async deleteImage(publicId: string): Promise<void> {
    await this.cloudinary.uploader.destroy(publicId);
  }
}
