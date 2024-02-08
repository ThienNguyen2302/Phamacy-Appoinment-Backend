import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport"
import { ExtractJwt, Strategy } from "passport-jwt";
import { AccountsRepository } from "./accounts.repository";
import { JwtPayload } from "./jwt-payload.interface";
import { Accounts } from "./accounts.entity";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private accountRepository: AccountsRepository,
        private configService: ConfigService,
    ) {
        super({
            secretOrKey: configService.get("JWT_SECRET"),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
    }

    public async validate(payload: JwtPayload): Promise<Accounts> {
        const { username } = payload;
        const account = this.accountRepository.findOneBy({ username });

        if (!account) {
            throw new UnauthorizedException();
        }

        return account;
    }
}