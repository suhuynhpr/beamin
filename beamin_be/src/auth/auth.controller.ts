//src/auth/auth.controller.ts

import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthEntity } from './entity/auth.entity';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';
import { RefreshDto } from './dto/refresh.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { UserEntity } from 'src/users/entities/user.entity';
@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  @ApiOkResponse({ type: AuthEntity })
  login(@Body() body: LoginDto) {
    console.log(body);
    return this.authService.login(body);
  }

  @Post('signup')
  @ApiOkResponse({ type: AuthEntity })
  signup(@Body() body: SignupDto) {
    return this.authService.signup(body);
  }

  @Post('refresh')
  @ApiBearerAuth()
  @ApiOkResponse({ type: AuthEntity })
  refresh(@Body() body: RefreshDto) {
    return this.authService.refresh(body);
  }


  @Get('user')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserEntity, isArray: true })
  async findUser(@Req() req: Request) {
    const authorization = req.headers['authorization'];
    const token = authorization.replace('Bearer ', '');
    const user = await this.authService.findUser(token);
    return user;
  }
}
