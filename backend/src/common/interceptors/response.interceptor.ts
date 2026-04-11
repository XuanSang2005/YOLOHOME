import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { RESPONSE_MESSAGE_KEY } from '../decorators/response-message.decorator'

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  constructor(private readonly reflector = new Reflector()) {}

  intercept(ctx: ExecutionContext, next: CallHandler): Observable<unknown> {
    const message = this.reflector.get<string | undefined>(
      RESPONSE_MESSAGE_KEY,
      ctx.getHandler(),
    )

    return next.handle().pipe(
      map((data: unknown) => ({
        success: true,
        data,
        ...(message ? { message } : {}),
      })),
    )
  }
}
