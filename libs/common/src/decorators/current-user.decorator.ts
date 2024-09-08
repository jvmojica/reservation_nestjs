import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserDocument } from 'apps/auth/src/users/models/user.schema';

const getCurrentUserByContext = (ctx: ExecutionContext): UserDocument => {
  return ctx.switchToHttp().getRequest().user;
};

export const CurrentUser = createParamDecorator(
  (_date: unknown, ctx: ExecutionContext) => getCurrentUserByContext(ctx),
);
