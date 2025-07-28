import { Injectable } from '@nestjs/common';
import { ISessionRepository } from './session.repository.interface';
import { Prisma, Session } from '@prisma/client';
import { PrismaService } from 'src/providers/prisma/prisma.service';

@Injectable()
export class SessionRepository implements ISessionRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.SessionUncheckedCreateInput): Promise<Session> {
    return await this.prisma.session.create({ data });
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
