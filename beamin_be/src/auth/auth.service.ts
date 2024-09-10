import {
  ForbiddenException,
  Injectable,
  ConflictException,
} from '@nestjs/common'
import { AuthDto } from './dto'
import * as argon from 'argon2'
import { PrismaService } from '../prisma//prisma.service'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { ForbiddenExceptionMessage } from '../common/exception.enum'
import { ErrorTypes } from 'src/common/error-types.enum'

@Injectable({})
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signup(dto: AuthDto) {
    //find the user by email
    const user =
      await this.prisma.user.findUnique({
        where: {
          email: dto.email,
        },
      })

    // if user does note exist throw exception
    if (user)
      throw new ConflictException({
        message: ErrorTypes.EMAIL_ALREADY_EXISTS,
      })
    //generate the password hash
    const hash = await argon.hash(dto.password)

    try {
      //save the new user to db
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          password: hash,
          firstName: dto.firstName,
          lastName: dto.lastName,
        },
      })

      const token = await this.signToken(
        user.id,
        user.email,
      )

      return {
        message: 'User registered successfully',
        data: { ...token },
        total: 1,
      }
    } catch (error) {
      if (
        error instanceof
        PrismaClientKnownRequestError
      ) {
        if (error.code === 'P2002') {
          throw new ForbiddenException(
            ForbiddenExceptionMessage.CredentialsTaken,
          )
        }
      }

      throw error
    }
  }
  async signin(dto: AuthDto) {
    //find the user by email
    const user =
      await this.prisma.user.findUnique({
        where: {
          email: dto.email,
        },
      })
    // if user does note exist throw exception
    if (!user)
      throw new ForbiddenException(
        ForbiddenExceptionMessage.CredentialsIncorrect,
      )

    //compare password
    const pwMatches = await argon.verify(
      user.password,
      dto.password,
    )
    //if password incorecct throw exception
    if (!pwMatches)
      throw new ForbiddenException(
        ForbiddenExceptionMessage.CredentialsIncorrect,
      )
    const token = await this.signToken(
      user.id,
      user.email,
    )
    return {
      message: 'User registered successfully',
      data: { ...token },
      total: 1,
    }
  }

  async signToken(
    userId: number,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
    }

    const secret = this.config.get('JWT_SECRET')

    const token = await this.jwt.signAsync(
      payload,
      {
        expiresIn: '15m',
        secret: secret,
      },
    )

    return {
      access_token: token,
    }
  }
}
