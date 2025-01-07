import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const ctx = GqlExecutionContext.create(context);
    const { currentUser } = ctx.getContext();

    if (!currentUser) {
      throw new ForbiddenException('User not authenticated');
    }
    
    const userRoles = Array.isArray(currentUser.roles) ? currentUser.roles : [currentUser.role];

    if (!userRoles || userRoles.length === 0) {
      throw new ForbiddenException('User roles not found');
    }

    const hasRole = requiredRoles.some((role) => userRoles.includes(role));
    if (!hasRole) {
      throw new ForbiddenException('Access denied: insufficient permissions');
    }

    return true;
  }
}
