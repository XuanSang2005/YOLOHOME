import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
export declare class ResponseInterceptor implements NestInterceptor {
    private readonly reflector;
    constructor(reflector?: Reflector);
    intercept(ctx: ExecutionContext, next: CallHandler): Observable<unknown>;
}
