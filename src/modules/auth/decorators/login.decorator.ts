import { applyDecorators, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export const ApiLogin = (): ReturnType<typeof applyDecorators> =>
  applyDecorators(
    ApiOperation({
      summary: 'Получение доступа',
    }),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'Пользователь успешно получил доступ',
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
