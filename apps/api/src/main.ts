import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as morgan from 'morgan';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  app.enableCors();
  app.use(morgan('dev'));

  app.useStaticAssets(process.env.STORAGE_PATH, {
    prefix: process.env.FILES_STATIC_PATH
  });

  await app.listen(5000);
}
bootstrap();
