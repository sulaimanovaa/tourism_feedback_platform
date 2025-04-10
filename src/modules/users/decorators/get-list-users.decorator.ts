import { applyDecorators, HttpCode, HttpStatus, Version } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export const ApiGetListUsers = (): ReturnType<typeof applyDecorators> =>
  applyDecorators(
    ApiOperation({
      summary: 'Получение списка пользователей',
    }),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'Успешное получение списка бизнес профилей',
    }),
    ApiResponse({
      status: HttpStatus.BAD_REQUEST,
      description: 'Ошибочные параметры запроса',
    }),
    HttpCode(HttpStatus.OK),
    Version('1'),
  );
