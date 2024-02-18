import { PublicRouter } from './../../decorators/public-router.decorator';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UsersService } from '../user/service/users.service';
import { LocalAuthGuard } from './../../guards/local-auth.guard';
import { RequestCustom } from './auth.i';
import { AuthService } from './auth.service';
import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @Post('/register')
  async register(@Body() body: CreateUserDto) {
    return await this.userService.create(body);
  }

  @PublicRouter()
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req: RequestCustom) {
    return await this.authService.login(req.user);
  }
}
