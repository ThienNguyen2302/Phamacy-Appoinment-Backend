import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { UsersService } from '../user/service/users.service';
import { PublicRouter } from './../../decorators/public-router.decorator';
import { LocalAuthGuard } from './../../guards/local-auth.guard';
import { RequestCustom } from './auth.i';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @PublicRouter()
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req: RequestCustom) {
    return await this.authService.login(req.user);
  }
}
