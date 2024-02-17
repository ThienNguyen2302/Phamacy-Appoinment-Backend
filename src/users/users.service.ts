import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './users.entity';
import { Repository } from 'typeorm';
import { Accounts } from 'src/auth/accounts.entity';
import { UpdateUserDto } from './dto/update-users.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users)
        private readonly userRepository: Repository<Users>,
    ) { }

    async createUser(account: Accounts): Promise<Users> {
        let user = this.userRepository.create({ account });
        user = await this.userRepository.save(user);
        return user;
    }

    async getUserByID(id: string): Promise<Users> {
        return this.userRepository.findOneBy({ id: id });
    }

    async getUser(account: Accounts): Promise<Users> {
        return await this.userRepository.findOne({ where: { account: account } })
    }

    async updateUser(account: Accounts, userDto: UpdateUserDto): Promise<Users> {
        let user = await this.getUser(account);
        Object.assign(user, userDto);
        return this.userRepository.save(user);
    }
}
