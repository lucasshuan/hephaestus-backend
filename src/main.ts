import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Hephaestus API')
    .setDescription('Hardware listings')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, documentFactory);

  app.use(cookieParser());
  app.enableCors({
    origin: ['https://hephaestus.felsen.io', 'http://localhost:3000'],
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 5007);
}
bootstrap();
