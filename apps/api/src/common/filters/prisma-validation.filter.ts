import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import {
  NotFoundError,
  PrismaClientValidationError,
} from '@prisma/client/runtime';
import { BaseApiExecptionResponse } from '../../types/api-exception.type';

@Catch(PrismaClientValidationError)
export class PrismaValidationFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}
  private logger = new Logger(PrismaValidationFilter.name);

  catch(exception: PrismaClientValidationError, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const message = exception.message;

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const responseBody: BaseApiExecptionResponse = {
      statusCode: httpStatus,
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
      isOperational: false,
      message: message,
    };

    this.logger.error(exception);
    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
