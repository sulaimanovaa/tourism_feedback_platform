import { applyDecorators, HttpCode, HttpStatus, Version } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export const ApiUpdateUser = (): ReturnType<typeof applyDecorators> =>
  applyDecorators(
    ApiOperation({
      summary: 'Редактирование профиля',
    }),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'Успешное обновление',
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
    Version('1'),
  );
