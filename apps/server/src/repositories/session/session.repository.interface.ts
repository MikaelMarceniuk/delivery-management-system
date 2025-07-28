import { Prisma, Session } from '@prisma/client';

export interface ISessionRepository {
  create(data: Prisma.SessionUncheckedCreateInput): Promise<Session>;
  inactivateSessionsByUserId(userId: string): Promise<Session[]>;
}
