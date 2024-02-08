import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AccountRole } from 'src/auth/accounts.entity';

@Injectable()
export class DoctorsGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    if(request.user.role === AccountRole.DOCTOR) {
        return true;
    }
    throw new UnauthorizedException();
  }
}