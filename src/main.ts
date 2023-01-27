import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  const config = await app.get(ConfigService);
  const port = config.get<number>('API_PORT');

  console.log('port', port);

  app.use(cookieParser());

  app.useGlobalPipes(new ValidationPipe());

  const options = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
    allowedHeaders: 'Content-Type, Accept',
  };

  app.enableCors(options);

  await app.listen(port || 8000, () => {
    console.log(`App started on port: ${port || 8000}`);
  });
}
bootstrap();
