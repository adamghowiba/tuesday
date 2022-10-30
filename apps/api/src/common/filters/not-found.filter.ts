import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { NotFoundError } from '@prisma/client/runtime';
import { BaseApiExecptionResponse } from '../../types/api-exception.type';
import { AllExecptionFilter } from './catch-all.filter';

@Catch(NotFoundError)
export class NotFoundFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}
  private logger = new Logger(NotFoundFilter.name);

  catch(exception: NotFoundError, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const message = exception.message;

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    this.logger.error(exception);

    const notFoundModule = exception.message.split(' ')[1];

    const responseBody: BaseApiExecptionResponse = {
      statusCode: httpStatus,
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
      isOperational: true,
      message: notFoundModule
        ? `No ${notFoundModule} found with that ID. Please try again`
        : message || 'Unable to find module with specfied paramters.',
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
