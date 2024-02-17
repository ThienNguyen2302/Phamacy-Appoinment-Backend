import { ConflictException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { AccountRole, Accounts } from "./accounts.entity";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import * as bcrypt from 'bcrypt';
import { url } from "gravatar"

@Injectable()
export class AccountsRepository extends Repository<Accounts> {

    constructor(private dataSource: DataSource) {
        super(Accounts, dataSource.createEntityManager());
    }

    async createAccount(authCredentialDto: AuthCredentialsDto, role: AccountRole): Promise<Accounts> {
        const { username, password, email, contact_number } = authCredentialDto;
        let salt = await bcrypt.genSalt();
        let hashedPassword = await bcrypt.hash(password, salt);
        let avatar = url(email)
        let account = this.create({ username, password: hashedPassword, email: email, contact_number: contact_number, role: role, avatar: avatar });
        try {
            return await this.save(account)
        } catch (error) {
            if (error.code === '23505') {
                // duplicate username
                throw new ConflictException('Username already exists');
            } else {
                throw new InternalServerErrorException();
            }
        }
    }
}