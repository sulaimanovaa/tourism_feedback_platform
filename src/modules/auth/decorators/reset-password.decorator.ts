import { applyDecorators, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export const ApiResetPassword = (): ReturnType<typeof applyDecorators> =>
  applyDecorators(
    ApiOperation({
      summary: 'Восстановление нового пароля',
    }),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'Новый пароль успешно сохранен',
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
