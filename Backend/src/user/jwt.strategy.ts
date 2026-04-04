/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { PrismaService } from '../prisma/prisma.service';
import { UserRole } from '@prisma/client';

interface JwtPayload {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  organizationId: string;
}
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private prisma: PrismaService,
    configService: ConfigService,
  ) {
    const secret = configService.get<string>('JWT_SECRET');
    if (!secret) throw new Error('JWT_SECRET is missing');
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret,
    });
  }

  async validate(payload: JwtPayload) {
    const users = await this.prisma.user.findUnique({
      where: {
        id: payload.id,
        email: payload.email,
        role: payload.role,
      },
      select: {
        id: true,
        email: true,
        role: true,
        name: true,
        organizationId: true,
      },
    });

    if (!users) {
      throw new UnauthorizedException('Invalid token');
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return users;
  }
}
