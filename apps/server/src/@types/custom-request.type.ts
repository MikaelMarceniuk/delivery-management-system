import { Session, User } from '@prisma/client';
import { Request } from 'express';

export interface ICustomRequest extends Request {
  user: User;
  session: Omit<Session, 'userId' | 'User'>;
}
