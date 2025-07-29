import { Injectable } from '@nestjs/common';
import {
  ISessionRepository,
  SessionWithUser,
  UpdateSessionParams,
} from './session.repository.interface';
import { Prisma, Session } from '@prisma/client';
import { PrismaService } from 'src/providers/prisma/prisma.service';

@Injectable()
export class SessionRepository implements ISessionRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findActiveSessionByUserId(
    userId: string,
  ): Promise<SessionWithUser | null> {
    return await this.prisma.session.findFirst({
      where: {
        userId,
        isActive: true,
        expiresAt: {
          gt: new Date(),
        },
      },
      include: {
        User: true,
      },
    });
  }

  async create(data: Prisma.SessionUncheckedCreateInput): Promise<Session> {
    return await this.prisma.session.create({ data });
  }

  async update({
    id,
    sessionTokenHash,
  }: UpdateSessionParams): Promise<Session> {
    return this.prisma.session.update({
      where: {
        id,
      },
      data: {
        sessionTokenHash,
      },
    });
  }

  async inactivateSessionsByUserId(userId: string): Promise<Session[]> {
    return await this.prisma.session.updateManyAndReturn({
      where: {
        userId,
      },
      data: {
        isActive: false,
      },
    });
  }
}
