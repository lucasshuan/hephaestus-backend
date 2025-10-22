import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  app.use(cookieParser());
  app.enableCors({
    origin: ['https://hephaestus.felsen.io', 'http://localhost:3000'],
    credentials: true,
  });

  if (process.env.NODE_ENV === 'dev') {
    const config = new DocumentBuilder()
      .setTitle('Hephaestus API')
      .setDescription('Hardware listings')
      .setVersion('1.0')
      .addCookieAuth('session')
      .build();
    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, documentFactory, {
      swaggerOptions: { persistAuthorization: true },
    });
  }

  const port = Number(process.env.PORT) || 3001;
  await app.listen(port);
}
void bootstrap();
