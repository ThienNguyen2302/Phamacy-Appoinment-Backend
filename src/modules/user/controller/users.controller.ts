import { RolesAndGuard } from '../../../decorators/roleAndGuard.decorator';
import { Controller, Get } from '@nestjs/common';
import { UsersService } from '../service/users.service';
import { ERoleUser } from '../entities/user.entity';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @RolesAndGuard([ERoleUser.ADMIN])
  @Get()
  getUserByUsername() {
    return 'ádasdasdasd';
  }
}
