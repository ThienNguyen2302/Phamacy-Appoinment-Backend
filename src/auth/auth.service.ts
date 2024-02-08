import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AccountsRepository } from './accounts.repository';
import { JwtService } from '@nestjs/jwt';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import * as bcrypt from 'bcrypt';
import { AccountRole } from './accounts.entity';
import { AuthSignInDto } from './dto/auth-signin.dto';
import { JwtPayload } from './jwt-payload.interface';
import {url} from "gravatar"

@Injectable()
export class AuthService {

    constructor(
        private accountsRepository: AccountsRepository,
        private jwtService: JwtService,
    ) { }

    async test(email) {
        return url(email)
    }

    async signUp(authCredentialDto: AuthCredentialsDto, role: AccountRole): Promise<void> {
        return this.accountsRepository.createAccount(authCredentialDto, role);
    }

    async signIn(authSignInDto: AuthSignInDto): Promise<{ accessToken: string }> {
        const { username, password } = authSignInDto;
        let account = await this.accountsRepository.findOneBy({ username });

        if (account && (await bcrypt.compare(password, account.password))) {
            const payload: JwtPayload = { username, id: account.id, role: account.role };
            let accessToken = await this.jwtService.sign(payload);
            return { accessToken };
        }
        else {
            throw new UnauthorizedException('Please check your login credentials');
        }
    }

}
