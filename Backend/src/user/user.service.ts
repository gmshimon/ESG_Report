/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { SignupDto } from './dto/signup.dto';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}
  async register(signupDto: SignupDto) {
    const { email, password, confirmPassword } = signupDto;

    if (password !== confirmPassword) {
      throw new Error('Passwords do not match');
    }

    // Check if the user already exists
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new Error('User already exists');
    }

    signupDto.password = await bcrypt.hash(signupDto.password, 10);

    const user = await this.prisma.$transaction(async (tx) => {
      const organization = await tx.organization.create({
        data: {
          name: signupDto.organization.name,
          slug: signupDto.organization.slug,
          industry: signupDto.organization.industry,
          country: signupDto.organization.country,
          website: signupDto.organization.website,
          description: signupDto.organization.description,
        },
      });

      const newUser = await tx.user.create({
        data: {
          name: signupDto.name,
          email,
          password: signupDto.password, // In production, hash the password before storing
          organization: {
            connect: {
              id: organization.id,
            },
          },
          role: 'ADMIN',
        },
      });

      return newUser;
    });

    return {
      token: this.jwtService.sign({
        id: user.id,
        email: user.email,
        role: user.role,
        organizationId: user.organizationId,
      }),
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        organizationId: user.organizationId,
      },
    };
  }

  async login(loginDto: { email: string; password: string }) {
    const { email, password } = loginDto;

    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    return {
      token: this.jwtService.sign({
        id: user.id,
        email: user.email,
        role: user.role,
        organizationId: user.organizationId,
      }),
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        organizationId: user.organizationId,
      },
    };
  }
}
