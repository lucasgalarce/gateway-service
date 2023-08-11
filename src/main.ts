import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import helmet from 'helmet';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new Logger(),
    bodyParser: false,
  });

  const appConfig = app.get<ConfigService>(ConfigService)['internalConfig']['config'];
  const { server, project } = appConfig;
  const port = parseInt(server.port, 10) || 8080;

  app.setGlobalPrefix(`${server.context}`);

  app.use([cookieParser(), helmet(), compression()]);

  app.useGlobalPipes(
    new ValidationPipe({
      validatorPackage: require('@nestjs/class-validator'),
      transformerPackage: require('class-transformer'),
      whitelist: true,
      // forbidUnknownValues: true,
      // forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  if (server.corsEnabled) {
    app.enableCors({
      origin: server.origins,
      allowedHeaders: `${server.allowedHeaders}`,
      methods: `${server.allowedMethods}`,
      credentials: server.corsCredentials,
    });
  }

  await app.listen(port, async () => {
    const appServer = `http://localhost:${port}/${server.context}`;
    Logger.log(`🚀 Application is running on: ${appServer}`, `${project.name}`);
  });
}

(async () => await bootstrap())();
