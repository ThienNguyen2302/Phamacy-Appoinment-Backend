import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { AccountsRepository } from './accounts.repository';
import { JwtService } from '@nestjs/jwt';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import * as bcrypt from 'bcrypt';
import { AccountRole } from './accounts.entity';
import { AuthSignInDto } from './dto/auth-signin.dto';
import { JwtPayload } from './jwt-payload.interface';

import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {

    constructor(
        private accountsRepository: AccountsRepository,
        private jwtService: JwtService,
        private userService: UsersService
    ) { }

    async signUp(authCredentialDto: AuthCredentialsDto, role: AccountRole): Promise<void> {
        let account = await this.accountsRepository.createAccount(authCredentialDto, role);
        if(role == AccountRole.USER) {
            let user = await this.userService.createUser(account)
        }
        else if (role == AccountRole.DOCTOR) {
            //create doctor
        }
        return ;
    }

    async signIn(authSignInDto: AuthSignInDto): Promise<{ accessToken: string, id: string }> {
        const { username, password } = authSignInDto;
        let account = await this.accountsRepository.findOneBy({ username });

        if (account && (await bcrypt.compare(password, account.password))) {
            const payload: JwtPayload = { username, id: account.id, role: account.role };
            let accessToken = await this.jwtService.sign(payload);
            return { accessToken, id: account.id };
        }
        else {
            throw new UnauthorizedException('Please check your login credentials');
        }
    }

}
