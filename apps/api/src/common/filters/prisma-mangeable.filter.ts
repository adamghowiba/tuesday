import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { DatabaseError } from '../errors/DatabaseError';

/* TODO: Unfinished/Unimplemented */
@Catch(PrismaClientKnownRequestError, DatabaseError)
export class PrismaMangeableFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(
    exception: PrismaClientKnownRequestError | DatabaseError,
    host: ArgumentsHost
  ) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
  }
}
