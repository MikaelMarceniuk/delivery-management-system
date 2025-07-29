import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ICustomRequest } from 'src/@types/custom-request.type';
import { SessionRepository } from 'src/repositories/session/session.repository';
import { compare } from 'bcrypt';

type payload = {
  sub: string;
  iat: number;
  exp: number;
};

@Injectable()
export class RefreshTokenGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly sessionRepository: SessionRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<ICustomRequest>();
    const refreshToken = req.cookies?.refreshToken as string;

    if (!refreshToken) {
      throw new UnauthorizedException('Missing refresh token');
    }

    try {
      const payload = await this.jwtService.verifyAsync<payload>(refreshToken);

      const activeSession =
        await this.sessionRepository.findActiveSessionByUserId(payload.sub);
      if (!activeSession) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      const isTokenValid = await compare(
        refreshToken,
        activeSession.refreshTokenHash,
      );
      if (!isTokenValid) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      req.user = activeSession.User;
      req.session = activeSession;

      return true;
    } catch (err) {
      if (err instanceof UnauthorizedException) throw err;

      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
