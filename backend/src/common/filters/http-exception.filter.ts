import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common'
import type { Response } from 'express'

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp()
    const res = ctx.getResponse<Response>()

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR

    const error =
      exception instanceof HttpException
        ? exception.message
        : 'Internal server error'

    // class-validator errors arrive as { message: string[] } in the exception response
    const exceptionResponse =
      exception instanceof HttpException ? exception.getResponse() : null

    const details =
      exceptionResponse !== null &&
      typeof exceptionResponse === 'object' &&
      'message' in exceptionResponse &&
      Array.isArray((exceptionResponse as { message: unknown }).message)
        ? (exceptionResponse as { message: string[] }).message
        : undefined

    res.status(status).json({
      success: false,
      error,
      ...(details !== undefined && { details }),
    })
  }
}
