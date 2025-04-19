import { applyDecorators, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export const ApiRegisterUser = (): ReturnType<typeof applyDecorators> =>
  applyDecorators(
    ApiOperation({
      summary: 'Регистрация',
    }),
    ApiResponse({
      status: HttpStatus.CREATED,
      description: 'Пользователь успешно зарегистрирован',
    }),
    ApiResponse({
      status: HttpStatus.BAD_REQUEST,
      description: 'Ошибочные параметры запроса',
    }),
    ApiResponse({
      status: HttpStatus.CONFLICT,
      description: 'Ошибочные параметры запроса',
    }),
    HttpCode(HttpStatus.CREATED),
  );
