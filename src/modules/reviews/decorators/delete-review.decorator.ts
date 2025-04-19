import { applyDecorators, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export const ApiDeleteReview = (): ReturnType<typeof applyDecorators> =>
  applyDecorators(
    ApiOperation({
      summary: 'Удаление отзыва',
    }),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'Успешное удаление',
    }),
    ApiResponse({
      status: HttpStatus.BAD_REQUEST,
      description: 'Ошибочные параметры запросаa',
    }),
    ApiResponse({
      status: HttpStatus.NOT_FOUND,
      description: 'Отзыв не найден',
    }),
    HttpCode(HttpStatus.OK),
  );
