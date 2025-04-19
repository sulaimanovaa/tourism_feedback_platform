import { applyDecorators, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export const ApiCreateFollow = (): ReturnType<typeof applyDecorators> =>
  applyDecorators(
    ApiOperation({
      summary: 'Подписаться',
    }),
    ApiResponse({
      status: HttpStatus.CREATED,
      description: 'Успешное создание запроса',
    }),
    ApiResponse({
      status: HttpStatus.BAD_REQUEST,
      description: 'Ошибочные параметры запроса',
    }),
    HttpCode(HttpStatus.CREATED),
  );
