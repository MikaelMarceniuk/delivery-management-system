import { Body, Controller, Post, Res } from '@nestjs/common';
import { SignInDTO } from './dto/sign-in.dto';
import { AuthService } from './auth.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in')
  async signIn(
    @Body() body: SignInDTO,
    @Res({ passthrough: true }) res: Response,
  ) {
    const {
      refreshToken,
      refreshTokenExpiresAt,
      sessionToken,
      sessionTokenExpiresAt,
    } = await this.authService.signIn(body);

    res.cookie('sessionToken', sessionToken, {
      httpOnly: true,
      secure: false, // TODO Implement logic to be true in prod
      sameSite: 'lax',
      path: '/',
      expires: sessionTokenExpiresAt,
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: false, // TODO Implement logic to be true in prod
      sameSite: 'lax',
      path: '/auth/refresh-token', // TODO Implement this path
      expires: refreshTokenExpiresAt,
    });

    res.status(200);
  }
}
