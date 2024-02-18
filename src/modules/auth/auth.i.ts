import { Request } from '@nestjs/common';
import { User } from '../user/entities/user.entity';
export interface RequestCustom extends Request {
  user: User;
}
