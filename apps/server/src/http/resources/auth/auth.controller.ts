import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { SignInDTO } from './dto/sign-in.dto';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { SessionTokenGuard } from 'src/http/guards/session-token.guard';
import { CurrentUser } from 'src/http/decorators/current-user.decorator';
import { Session, User } from '@prisma/client';
import { UserPresenter } from '../user/presenter/user.presenter';
import { RefreshTokenGuard } from 'src/http/guards/refresh-token.guard';
import { CurrentSession } from 'src/http/decorators/session.decorator';

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
      path: '/auth/refresh',
      expires: refreshTokenExpiresAt,
    });

    res.status(200).send();
  }

  @UseGuards(RefreshTokenGuard)
  @Post('/refresh')
  async refreshSessionToken(
    @CurrentSession() session: Session,
    @Res() res: Response,
  ) {
    const { sessionToken, sessionTokenExpiresAt } =
      await this.authService.refreshSessionToken(session);

    res.cookie('sessionToken', sessionToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      path: '/',
      expires: sessionTokenExpiresAt,
    });

    res.status(200).send();
  }

  @UseGuards(SessionTokenGuard)
  @Get('/session')
  getSession(@CurrentUser() user: User) {
    return new UserPresenter(user);
  }
}
