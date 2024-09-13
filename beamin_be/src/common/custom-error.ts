import { HttpException, HttpStatus } from '@nestjs/common';

export class CustomError extends HttpException {
  constructor(
    message: string,
    statusCode: HttpStatus,
    success: boolean = false,
  ) {
    super(
      {
        message,
        statusCode,
        success,
      },
      statusCode,
    );
  }
}
