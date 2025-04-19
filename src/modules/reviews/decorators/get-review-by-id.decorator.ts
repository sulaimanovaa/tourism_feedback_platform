import { applyDecorators, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export const ApiGetReviewById = (): ReturnType<typeof applyDecorators> =>
  applyDecorators(
    ApiOperation({
      summary: 'Получение отзыва по id',
    }),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'Отзыв успешно найден',
    }),
    ApiResponse({
      status: HttpStatus.BAD_REQUEST,
      description: 'Ошибочные параметры запроса',
    }),
    ApiResponse({
      status: HttpStatus.NOT_FOUND,
      description: 'Отзыв не найден',
    }),
    HttpCode(HttpStatus.OK),
  );
