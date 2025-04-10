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
  const PORT = appConfig.port;;

  if (!appConfig.isProduction) {
    const config = new DocumentBuilder()
      .setTitle('Travel - Builder Service')
      .setDescription('Сервис Builder')
      .setVersion('1.0')
      .addTag('doc.json')
      .addApiKey(
        {
          type: 'apiKey',
          name: 'authorization',
        },
        'oneid',
      )
      .build();
    const document = SwaggerModule.createDocument(app, config, {
      ignoreGlobalPrefix: false,
    });
    SwaggerModule.setup('/api/swagger', app, document);
  }

  await app.listen(PORT, '0.0.0.0', () => {
    logger.verbose(`Service available on ${PORT}`);
    logger.debug(`Swagger available at ${PORT}/api/swagger`);
  });
}
bootstrap();