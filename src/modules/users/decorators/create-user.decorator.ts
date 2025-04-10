import { applyDecorators, HttpCode, HttpStatus, Version } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export const ApiCreateUser = (): ReturnType<typeof applyDecorators> =>
  applyDecorators(
    ApiOperation({
      summary: 'Регистрация пользователя',
    }),
    ApiResponse({
      status: HttpStatus.CREATED,
      description: 'Успешное создание',
    }),
    ApiResponse({
      status: HttpStatus.BAD_REQUEST,
      description: 'Ошибочные параметры запроса',
    }),
    HttpCode(HttpStatus.CREATED),
    Version('1'),
  );
