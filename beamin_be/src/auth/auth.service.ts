//src/auth/auth.service.ts
import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { AuthEntity } from './entity/auth.entity';
import * as bcrypt from 'bcrypt';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshDto } from './dto/refresh.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  private generateAuthResponse(userId: number): AuthEntity {
    const accessToken = this.jwtService.sign({ userId }, { expiresIn: '1h' });
    const refreshToken = this.jwtService.sign({ userId }, { expiresIn: '7d' });
    const accessTokenExp = this.jwtService.decode(accessToken)['exp'];
    const expiresIn = accessTokenExp - Math.floor(Date.now() / 1000);

    return {
      success: true,
      data: {
        access_token: accessToken,
        expires_in: expiresIn,
        refresh_token: refreshToken,
        user_id: userId,
      },
    };
  }

  async login(body: LoginDto): Promise<AuthEntity> {
    const { email, password } = body;
    // Step 1: Fetch a user with the given email
    const user = await this.prisma.user.findUnique({ where: { email: email } });

    // If no user is found, throw an error
    if (!user) {
      throw new NotFoundException(`No user found for email: ${email}`);
    }

    // Step 2: Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // If password does not match, throw an error
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    return this.generateAuthResponse(user.id);
  }

  async signup(body: SignupDto): Promise<AuthEntity> {
    const { email, password, name } = body;
    // Step 1: Check if the email is already in use
    const existingUser = await this.prisma.user.findUnique({
      where: { email: email },
    });
    if (existingUser) {
      throw new ConflictException('Email already in use');
    }

    // Step 2: Hash the password and create the user
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    return this.generateAuthResponse(user.id);
  }

  async refresh(body: RefreshDto): Promise<AuthEntity> {
    const { refreshToken } = body;
    const decoded = this.jwtService.verify(refreshToken);
    const userId = decoded.userId;
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.generateAuthResponse(user.id);
  }
}
