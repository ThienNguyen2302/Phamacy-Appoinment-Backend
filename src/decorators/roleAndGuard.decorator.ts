import { RolesGuard } from '../guards/roles.guard';
import { SetMetadata, UseGuards } from '@nestjs/common';
import { ROLES } from './roles.decorator';

export const RolesAndGuard = (roles: string[]) => {
  return (target, key?, descriptor?) => {
    SetMetadata(ROLES, roles)(target, key, descriptor);
    UseGuards(RolesGuard)(target, key, descriptor);
  };
};
