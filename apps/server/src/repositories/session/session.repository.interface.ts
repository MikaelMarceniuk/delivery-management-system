import { Prisma, Session } from '@prisma/client';

export type SessionWithUser = Prisma.SessionGetPayload<{
  include: { User: true };
}>;

export interface ISessionRepository {
  findActiveSessionByUserId(userId: string): Promise<SessionWithUser | null>;
  create(data: Prisma.SessionUncheckedCreateInput): Promise<Session>;
  inactivateSessionsByUserId(userId: string): Promise<Session[]>;
}
