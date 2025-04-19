import { applyDecorators, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export const ApiUploadImage = (): ReturnType<typeof applyDecorators> =>
  applyDecorators(
    ApiOperation({
      summary: 'Загрузка изображения',
    }),
    ApiResponse({
      status: HttpStatus.CREATED,
      description: 'Изображение успешно сохранено',
    }),
    ApiResponse({
      status: HttpStatus.BAD_REQUEST,
      description: 'Ошибочные параметры запроса',
    }),
    HttpCode(HttpStatus.OK),
  );
