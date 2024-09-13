import { HttpStatus, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CustomError } from 'src/common/custom-error';
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err: any, user: any) {
    if (err || !user) {
      throw new CustomError('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }
}
