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

    //   async createUser(createUserDto: CreateUserDto): Promise<Users> {
    //     const user = this.userRepository.create(createUserDto);
    //     return await this.userRepository.save(user);
    //   }

    async getUser(account: Accounts): Promise<Users> {
        let user = await this.userRepository.findOne({ where: { account: account } });

        if (!user) {
            user = this.userRepository.create({ account });
            user = await this.userRepository.save(user);
        }

        return user;
    }

    async updateUser(account: Accounts, userDto: UpdateUserDto): Promise<Users> {
        let user = await this.getUser(account);
        Object.assign(user, userDto);
        return this.userRepository.save(user);
    }
}
