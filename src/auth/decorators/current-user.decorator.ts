import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data: any, context: ExecutionContext) => {
    const ctx = context.getArgByIndex(2); 
    return ctx.req.user;
  },
);
