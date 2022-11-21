import { Logger, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { PrismaService } from './common/services/database/prisma.service';
import * as morgan from 'morgan';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    credentials: true,
    origin: (orgin, callback) => callback(null, orgin),
  });
  app.enableVersioning({ defaultVersion: '1', type: VersioningType.URI });
  app.use(morgan('dev'));

  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  /* Init Swagger */
  const config = new DocumentBuilder()
    .setTitle('Web Revived Backend API')
    .setDescription('The Web Revived API description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config, {});
  SwaggerModule.setup('docs', app, document);

  const port = process.env.PORT || 5000;
  await app.listen(port);

  Logger.log(`🚀 Application is running on: http://localhost:${port}`);
}

bootstrap();
