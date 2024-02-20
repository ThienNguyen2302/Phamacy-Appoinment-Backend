import { Request } from '@nestjs/common';
import { IUserBaseInfo } from '../user/entities/user.entity';
export interface RequestCustom extends Request {
  user: IUserBaseInfo;
}
