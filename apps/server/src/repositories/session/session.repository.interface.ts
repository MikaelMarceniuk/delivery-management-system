import { Prisma, Session } from '@prisma/client';

export type SessionWithUser = Prisma.SessionGetPayload<{
  include: { User: true };
}>;

export type UpdateSessionParams = {
  id: string;
  sessionTokenHash: string;
};

export interface ISessionRepository {
  findActiveSessionByUserId(userId: string): Promise<SessionWithUser | null>;
  create(data: Prisma.SessionUncheckedCreateInput): Promise<Session>;
  update(data: UpdateSessionParams): Promise<Session>;
  inactivateSessionsByUserId(userId: string): Promise<Session[]>;
}
