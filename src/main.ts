import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger, VersioningType } from '@nestjs/common';
import { AppConfig } from './configs/app.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
    credentials: true,
    methods: ['POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS', 'GET', 'HEAD'],
  });
  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
  });

  const appConfig = app.get(AppConfig);
  const logger = new Logger('Bootstrap');
  const PORT = appConfig.port;

  if (!appConfig.isProduction) {
    const documentConfig = new DocumentBuilder()
      .setTitle('Travel service')
      .build();

    SwaggerModule.setup(
      'swagger',
      app,
      SwaggerModule.createDocument(app, documentConfig),
    );
  }

  await app.listen(PORT, '0.0.0.0', () => {
    logger.verbose(`Service available on ${PORT}`);
    logger.debug(`Swagger available at ${PORT}/api/swagger`);
  });
}
bootstrap();