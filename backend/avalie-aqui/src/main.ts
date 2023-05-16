import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true })); // Configuração do ValidationPipe

  // Configuração do Swagger (Swagger: http://localhost:3000/api)
  const config = new DocumentBuilder()
    .setTitle('AvalieAqui')
    .setDescription('Descrição da API do AvalieAqui')
    .setVersion('0.1')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Inicia o servidor
  await app.listen(4000, '0.0.0.0');
}
bootstrap();
