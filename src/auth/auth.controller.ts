import { Body, Controller, Post } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';
import { AccountRole } from './accounts.entity';
import { AuthSignInDto } from './dto/auth-signin.dto';

@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService,
    ) { }
    
    @Post("/create-user")
    async createUser(@Body() authCredentialsDto: AuthCredentialsDto): Promise<void> {
        return await this.authService.signUp(authCredentialsDto, AccountRole.USER)
    }

    @Post("/create-doctor")
    async createDoctor(@Body() authCredentialsDto: AuthCredentialsDto): Promise<void> {
        return await this.authService.signUp(authCredentialsDto, AccountRole.DOCTOR)
    }

    @Post('/signin')
    async signIn(@Body()authSignInDto: AuthSignInDto ): Promise<{ accessToken: string }> {
        return this.authService.signIn(authSignInDto);
    }
}
