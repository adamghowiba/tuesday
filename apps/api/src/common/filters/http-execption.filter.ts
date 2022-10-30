import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { Request, Response } from 'express';
import { BaseApiExecptionResponse } from '../../types/api-exception.type';

@Catch(HttpException)
export class HttpExecptionFilter implements ExceptionFilter {
  constructor(private host: HttpAdapterHost) {}

  private readonly logger = new Logger(HttpExecptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const status = exception.getStatus();
    const response = ctx.getResponse<Response>();
    const request = ctx.getResponse<Request>();
    const message = exception.message;
    const exceptionResponse = exception.getResponse();


    const responseBody: BaseApiExecptionResponse = {
      statusCode: status,
      path: request.url,
      timestamp: new Date().toISOString(),
      isOperational: status < 500,
      message,
    };

    if (exceptionResponse instanceof Object) Object.assign(responseBody, exceptionResponse)

    this.logger.error(message);
    response.status(status).json(responseBody);
  }
}
