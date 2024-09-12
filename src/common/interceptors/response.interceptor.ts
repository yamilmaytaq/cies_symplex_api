import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
  } from '@nestjs/common';
  import { map, Observable } from 'rxjs';
  
  @Injectable()
  export class ResponseInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      return next.handle().pipe(
        map((data) => ({
          message: 'Request successful',
          error: '',
          result: data,
          statusCode: context.switchToHttp().getResponse().statusCode,
        })),
      );
    }
  }
  