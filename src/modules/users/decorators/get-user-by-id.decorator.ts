import { applyDecorators, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export const ApiGetUserById = (): ReturnType<typeof applyDecorators> =>
  applyDecorators(
    ApiOperation({
      summary: 'Получение пользователя по id',
    }),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'Пользователь успешно найден',
    }),
    ApiResponse({
      status: HttpStatus.BAD_REQUEST,
      description: 'Ошибочные параметры запроса',
    }),
    ApiResponse({
      status: HttpStatus.NOT_FOUND,
      description: 'Пользователь не найден',
    }),
    HttpCode(HttpStatus.OK),
  );
