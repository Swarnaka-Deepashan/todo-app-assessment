import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import e from 'express';
import { TaskErrorCodes, TaskErrorMessages } from 'src/tasks/tasks.enums';

// TODO - Build an error code system

@Catch()
export class CatchEverythingFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();

    let httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Error Occurred';
    let errorCode = 'INTERNAL_SERVER_ERROR';
    let details: string[] | null = null;
    let path = httpAdapter.getRequestUrl(ctx.getRequest());

    const normalizeErrorCode = (code: string) =>
      code
        .toString()
        .trim()
        .toUpperCase()
        .replace(/\s+/g, '_');  

    // 1️⃣ Handle NestJS HttpExceptions
    if (exception instanceof HttpException) {
      httpStatus = exception.getStatus();
      const res = exception.getResponse();

      // Validation Error (class-validator)
      if (typeof res === 'object' && Array.isArray((res as any).message)) {
        message = TaskErrorMessages.VALIDATION_ERROR;
        errorCode = TaskErrorCodes.VALIDATION_ERROR;
        details = (res as any).message;
      } else {
        const body = res as any;
        message = body?.message || exception?.message || 'Error Occurred';

        // Normalize errorCode
        // errorCode = (body?.errorCode || body?.error || 'ERROR')
        //   .toString()
        //   .trim()
        //   .toUpperCase()
        //   .replace(/\s+/g, '_');

        errorCode = normalizeErrorCode(body?.errorCode || body?.error || message);
      }
    }

    // 2️⃣ Handle unexpected exceptions (CastError, TypeError, etc.)
    else if (exception instanceof Error) {
      message = exception.message;
    //   errorCode = exception.name.toUpperCase().replace(/\s+/g, '_');

    errorCode = normalizeErrorCode(exception.name || message || 'ERROR');

    }

    const responseBody = {
      success: false,
      message,
      errorCode,
      details,
      timestamp: new Date().toISOString(),
      path,
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
