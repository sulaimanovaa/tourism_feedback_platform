import { applyDecorators, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export const ApiDeleteFollow = (): ReturnType<typeof applyDecorators> =>
  applyDecorators(
    ApiOperation({
      summary: 'Отписаться',
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
      description: 'Подписка не найдена',
    }),
    HttpCode(HttpStatus.OK),
  );
