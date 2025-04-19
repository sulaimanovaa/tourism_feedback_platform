import { applyDecorators, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export const ApiGetFollowingById = (): ReturnType<typeof applyDecorators> =>
  applyDecorators(
    ApiOperation({
      summary: 'Получение подписок по id пользователя',
    }),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'Подписки успешно найдены',
    }),
    ApiResponse({
      status: HttpStatus.BAD_REQUEST,
      description: 'Ошибочные параметры запроса',
    }),
    ApiResponse({
      status: HttpStatus.NOT_FOUND,
      description: 'Подписки не найдены',
    }),
    HttpCode(HttpStatus.OK),
  );
