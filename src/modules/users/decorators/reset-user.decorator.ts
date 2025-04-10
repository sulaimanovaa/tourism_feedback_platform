import { applyDecorators, HttpCode, HttpStatus, Version } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export const ApiResetUser = (): ReturnType<typeof applyDecorators> =>
  applyDecorators(
    ApiOperation({
      summary: 'Восстановление профиля',
    }),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'Успешное восстановление',
    }),
    ApiResponse({
      status: HttpStatus.BAD_REQUEST,
      description: 'Ошибочные параметры запросаa',
    }),
    ApiResponse({
      status: HttpStatus.NOT_FOUND,
      description: 'Пользователь не найден',
    }),
    HttpCode(HttpStatus.OK),
    Version('1'),
  );
