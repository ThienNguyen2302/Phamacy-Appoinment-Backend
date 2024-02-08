import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Accounts } from './accounts.entity';

export const GetAccount = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): Accounts => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);