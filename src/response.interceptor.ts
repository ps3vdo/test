import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Logger,
  NestInterceptor,
} from "@nestjs/common";
import { map, Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

export interface ResponseError {
  error: string;
  message: string;
}

export interface ResponseResults<T> {
  result: T[];
  count: number;
}

export interface ResponseResult<T> {
  result: T;
}

export type Response<T> =
  | ResponseError
  | ResponseResult<T>
  | ResponseResults<T>;

export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  private logger = new Logger("ResponseInterceptor");

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next
      .handle()
      .pipe(
        map((result) => (Array.isArray(result?.result) ? result : { result })),
      )
      .pipe(
        catchError((err) => {
          this.logger.error(err);
          const statusCode =
            err?.status ||
            err.response?.statusCode ||
            HttpStatus.INTERNAL_SERVER_ERROR;
          const errorType = err.response?.error || "Internal Server Error";
          const respMessage = Array.isArray(err.response?.message)
            ? err.response?.message[0]
            : err.response?.message;
          const message = respMessage || err.message;
          const details = err.response?.details;

          return throwError(
            () =>
              new HttpException(
                { error: errorType, message, details },
                statusCode,
              ),
          );
        }),
      );
  }
}
