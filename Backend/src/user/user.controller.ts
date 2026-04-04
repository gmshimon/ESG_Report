/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Controller, Post, Body, Req, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { SignupDto } from './dto/signup.dto';
import { type Request, type Response } from 'express';

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
}
