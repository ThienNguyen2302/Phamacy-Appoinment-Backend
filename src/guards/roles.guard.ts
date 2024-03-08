import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ERoleUser } from '../modules/user/entities/user.entity';
import { ROLES } from './../decorators/roles.decorator';
import { RequestCustom } from './../modules/auth/auth.i';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.getAllAndOverride<string[]>(ROLES, [context.getHandler(), context.getClass()]);
    if (!roles?.length) {
      return true; // Nếu không có decorator @Roles, cho phép truy cập
    }

    const request = context.switchToHttp().getRequest() as RequestCustom;
    const user = request.user;
    if (user.role === ERoleUser.ADMIN) return true;

    return roles.includes(user.role);
  }
}
