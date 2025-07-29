import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { SignInDTO } from './dto/sign-in.dto';
import { UserRepository } from 'src/repositories/user/user.repository';
import { compare, genSalt, hash } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SessionRepository } from 'src/repositories/session/session.repository';
import { SignInPresenter } from './presenters/sign-in.presenter';
import {
  addDays,
  addMinutes,
  daysToSeconds,
  minutesToSeconds,
} from 'src/utils/time.utils';
import { Session } from '@prisma/client';
import { RefreshTokenPresenter } from './presenters/refresh-token.presenter';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userRepository: UserRepository,
    private readonly sessionRepository: SessionRepository,
  ) {}

  async signIn({ email, password }: SignInDTO) {
    try {
      const user = await this.userRepository.findByEmail(email);
      if (!user) throw new UnauthorizedException('E-mail ou senha inválidos');

      const passwordMatches = await compare(password, user.hashedPassword);
      if (!passwordMatches)
        throw new UnauthorizedException('E-mail ou senha inválidos');

      // Inativa sessoes ativas
      await this.sessionRepository.inactivateSessionsByUserId(user.id);

      // Gera tokens
      const payload = { sub: user.id };
      const now = new Date();

      const sessionTokenExpiresAt = addMinutes(now, 15);
      const sessionToken = await this.jwtService.signAsync(payload, {
        expiresIn: minutesToSeconds(15),
      });

      const refreshTokenExpiresAt = addDays(now, 30);
      const refreshToken = await this.jwtService.signAsync(payload, {
        expiresIn: daysToSeconds(30),
      });

      // Gera Hash dos tokens
      const salts = await genSalt(10);
      const refreshTokenHash = await hash(refreshToken, salts);
      const sessionTokenHash = await hash(sessionToken, salts);

      // Salva session
      await this.sessionRepository.create({
        refreshTokenHash,
        sessionTokenHash,
        expiresAt: refreshTokenExpiresAt,
        isActive: true,
        userId: user.id,
      });

      return new SignInPresenter({
        refreshToken,
        refreshTokenExpiresAt,
        sessionToken,
        sessionTokenExpiresAt,
      });
    } catch (err) {
      if (err instanceof UnauthorizedException) throw err;

      throw new InternalServerErrorException(
        'Erro interno ao tentar fazer login',
      );
    }
  }

  async refreshSessionToken(session: Session) {
    try {
      // Gera tokens
      const payload = { sub: session.userId };
      const now = new Date();

      const sessionTokenExpiresAt = addMinutes(now, 15);
      const sessionToken = await this.jwtService.signAsync(payload, {
        expiresIn: minutesToSeconds(15),
      });

      // Gera Hash dos tokens
      const salts = await genSalt(10);
      const sessionTokenHash = await hash(sessionToken, salts);

      // Salva session
      await this.sessionRepository.update({
        id: session.id,
        sessionTokenHash,
      });

      return new RefreshTokenPresenter({
        sessionToken,
        sessionTokenExpiresAt,
      });
    } catch (err) {
      throw new InternalServerErrorException(
        'Erro interno ao tentar fazer login',
      );
    }
  }
}
