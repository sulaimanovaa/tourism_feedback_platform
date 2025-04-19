import { applyDecorators, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export const ApiVerifyEmail = (): ReturnType<typeof applyDecorators> =>
  applyDecorators(
    ApiOperation({
      summary: 'Подтверждение почты',
    }),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'Почта успешно подтверждена',
    }),
    ApiResponse({
      status: HttpStatus.BAD_REQUEST,
      description: 'Ошибочные параметры запроса',
    }),
    ApiResponse({
      status: HttpStatus.NOT_FOUND,
      description: 'Почта не была зарегистрирована',
    }),
    HttpCode(HttpStatus.OK),
  );
