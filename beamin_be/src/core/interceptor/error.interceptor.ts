import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
  HttpStatus,
} from '@nestjs/common'
import { Observable, throwError } from 'rxjs'
import { catchError } from 'rxjs/operators'
import { ErrorTypes } from 'src/common/error-types.enum'

export interface ErrorResponse {
  statusCode: number
  message: string
  error: ErrorTypes | string
}

@Injectable()
export class ErrorInterceptor
  implements NestInterceptor
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        let status =
          HttpStatus.INTERNAL_SERVER_ERROR
        let message = 'Internal server error'
        let errorType: ErrorTypes | string =
          'Internal Server Error'

        if (error instanceof HttpException) {
          status = error.getStatus()
          const response =
            error.getResponse() as any
          message =
            response.message || error.message
          errorType = response.error || error.name
        }

        const errorResponse: ErrorResponse = {
          statusCode: status,
          message: message,
          error: errorType,
        }

        return throwError(() => errorResponse)
      }),
    )
  }
}
