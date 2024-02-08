import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';
import { AccountRole } from './accounts.entity';
import { AuthSignInDto } from './dto/auth-signin.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('auth')
@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService,
    ) { }

    @UseGuards(AuthGuard())
    @Get()
    test(@Body() email) {
        return this.authService.test(email);
    }
    
    @ApiBody({ type: [AuthCredentialsDto] })
    @Post("/create-user")
    async createUser(@Body() authCredentialsDto: AuthCredentialsDto): Promise<void> {
        return await this.authService.signUp(authCredentialsDto, AccountRole.USER)
    }

    @ApiBody({ type: [AuthCredentialsDto] })
    @Post("/create-doctor")
    async createDoctor(@Body() authCredentialsDto: AuthCredentialsDto): Promise<void> {
        return await this.authService.signUp(authCredentialsDto, AccountRole.DOCTOR)
    }

    @ApiBody({type: [AuthSignInDto]})
    @Post('/signin')
    async signIn(@Body()authSignInDto: AuthSignInDto ): Promise<{ accessToken: string }> {
        return this.authService.signIn(authSignInDto);
    }
}
