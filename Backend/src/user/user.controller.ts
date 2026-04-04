/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Controller, Post, Body, Req, Res, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { SignupDto } from './dto/signup.dto';
import { type Request, type Response } from 'express';
import { User } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  async register(
    @Req() request: Request,
    @Res() response: Response,
    @Body() signupDto: SignupDto,
  ): Promise<any> {
    try {
      const result = await this.userService.register(signupDto);
      return response.status(200).json({
        message: 'User registered successfully',
        data: result,
      });
    } catch (error) {
      return response.status(400).json({
        message: 'Error registering user',
        error: error.message,
      });
    }
  }

  @Post('login')
  async login(
    @Req() request: Request,
    @Res() response: Response,
    @Body() loginDto: { email: string; password: string },
  ): Promise<any> {
    try {
      const result = await this.userService.login(loginDto);
      return response.status(200).json({
        message: 'User logged in successfully',
        data: result,
      });
    } catch (error) {
      return response.status(400).json({
        message: 'Error logging in user',
        error: error.message,
      });
    }
  }

  @Get('/me')
  @UseGuards(AuthGuard('jwt'))
  async getProfile(@Req() request: Request, @Res() response: Response) {
    try {
      const user = (request as Request & { user?: User }).user;

      if (!user) {
        throw new Error('User not found in request');
      }

      const result = await this.userService.getProfile(user.id);

      return response.status(200).json({
        message: 'User profile fetched successfully',
        data: result,
      });
    } catch (error) {
      return response.status(400).json({
        message: 'Error fetching user profile',
        error: error.message,
      });
    }
  }
}
