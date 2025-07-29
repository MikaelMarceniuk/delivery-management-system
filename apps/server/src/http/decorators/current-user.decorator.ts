import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '@prisma/client';
import { ICustomRequest } from 'src/@types/custom-request.type';

export const CurrentUser = createParamDecorator(
  <K extends keyof User = keyof User>(
    key: K | undefined,
    ctx: ExecutionContext,
  ) => {
    const request = ctx.switchToHttp().getRequest<ICustomRequest>();
    const user = request.user;

    if (!user) return null;

    if (key) {
      return user[key];
    }

    return user;
  },
);
