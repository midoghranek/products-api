import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../enums';

const matchRoles = (roles: Role[], userRole: Role) => {
  return roles.some((role) => role === userRole);
};

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<Role[]>('roles', context.getHandler());
    if (!roles) return true;

    const req = context.switchToHttp().getRequest() as any;
    const user = req.user;

    const matcher = matchRoles(roles, user.role);

    if (!matcher)
      throw new ForbiddenException(
        'You do not have permission to access this resource',
      );

    return matcher;
  }
}
