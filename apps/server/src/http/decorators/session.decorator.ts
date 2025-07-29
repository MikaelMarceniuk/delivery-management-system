import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '@prisma/client';
import { ICustomRequest } from 'src/@types/custom-request.type';

export const CurrentSession = createParamDecorator(
  (_data: undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<ICustomRequest>();
    const session = request.session;

    if (!session) return null;

    return session;
  },
);
