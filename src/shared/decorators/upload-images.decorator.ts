import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';

export function UploadImages(maxCount = 3) {
  return applyDecorators(
    UseInterceptors(FileFieldsInterceptor([{ name: 'images', maxCount }])),
    ApiConsumes('multipart/form-data'),
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          reviewImages: {
            type: 'array',
            items: { type: 'string', format: 'binary' },
          },
        },
      },
    }),
  );
}

export function UploadImage() {
  return applyDecorators(
    UseInterceptors(FileInterceptor('file')),
    ApiConsumes('multipart/form-data'),
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          file: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    }),
  );
}
