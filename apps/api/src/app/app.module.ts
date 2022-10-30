import {
  ClassSerializerInterceptor,
  Module,
  ValidationPipe,
} from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { AllExecptionFilter } from '../common/filters/catch-all.filter';
import { HttpExecptionFilter } from '../common/filters/http-execption.filter';
import { NotFoundFilter } from '../common/filters/not-found.filter';
import { PrismaValidationFilter } from '../common/filters/prisma-validation.filter';
import { BoardsModule } from '../modules/boards/boards.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [BoardsModule],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_FILTER, useClass: AllExecptionFilter },
    { provide: APP_FILTER, useClass: NotFoundFilter },
    { provide: APP_FILTER, useClass: PrismaValidationFilter },
    { provide: APP_FILTER, useClass: HttpExecptionFilter },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        forbidNonWhitelisted: true,
        whitelist: true,
      }),
    },
  ],
})
export class AppModule {}
