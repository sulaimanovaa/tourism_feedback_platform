import { applyDecorators, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export const ApiGetFollowersById = (): ReturnType<typeof applyDecorators> =>
  applyDecorators(
    ApiOperation({
      summary: 'Получение всех подписчиков по id пользователя',
    }),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'Подписчики успешно найдены',
    }),
    ApiResponse({
      status: HttpStatus.BAD_REQUEST,
      description: 'Ошибочные параметры запроса',
    }),
    ApiResponse({
      status: HttpStatus.NOT_FOUND,
      description: 'Подписчики не найдены',
    }),
    HttpCode(HttpStatus.OK),
  );
