import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import {Logger} from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule , {
    logger: ['log', 'error', 'warn', 'debug', 'verbose'], // Enable all log levels
  });  
  app.enableCors({
    origin: '*', // Allow all origins
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS', // Allow all methods
    allowedHeaders: '*', // Allow all headers
    credentials: true, 
  });
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/',
  });
  const config = new DocumentBuilder()
    .setTitle('Quantum Kids API')
    .setDescription('The Quantum Kids API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3002);
  Logger.log('Application is running on https://api.quantumkids.in/');
}
bootstrap();
