import { RolesAndGuard } from '../../../decorators/roleAndGuard.decorator';
import { Controller, Get } from '@nestjs/common';
import { UsersService } from '../service/users.service';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @RolesAndGuard(['admin'])
  @Get()
  getUserByUsername() {
    return 'ádasdasdasd';
  }
}
