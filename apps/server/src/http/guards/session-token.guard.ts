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
export class SessionTokenGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly sessionRepository: SessionRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<ICustomRequest>();
    const sessionToken = req.cookies?.sessionToken as string;

    if (!sessionToken) {
      throw new UnauthorizedException('Missing session token');
    }

    try {
      const payload = await this.jwtService.verifyAsync<payload>(sessionToken);

      const activeSession =
        await this.sessionRepository.findActiveSessionByUserId(payload.sub);
      if (!activeSession) {
        throw new UnauthorizedException('Invalid session token');
      }

      const isTokenValid = await compare(
        sessionToken,
        activeSession.sessionTokenHash,
      );
      if (!isTokenValid) {
        throw new UnauthorizedException('Invalid session token');
      }

      req.user = activeSession.User;

      return true;
    } catch (err) {
      if (err instanceof UnauthorizedException) throw err;

      throw new UnauthorizedException('Invalid session token');
    }
  }
}
