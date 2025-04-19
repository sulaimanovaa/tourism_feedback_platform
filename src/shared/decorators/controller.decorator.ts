import { applyDecorators, Controller, UsePipes, ValidationPipe } from '@nestjs/common';

export const ControllerDecorator = (name: string): ReturnType<typeof applyDecorators> =>
  applyDecorators(
    UsePipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    ),
    Controller(name),
  );
