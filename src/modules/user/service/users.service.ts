import { UserRepository } from './../../../repositories/user/user.repository.service';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { MyLogger } from '../../../common/services/logger/logger.service';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { genSaltSync, hashSync } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly logger: MyLogger,
  ) {}

  async findOneWithUserName(username: string): Promise<User> {
    const user = await this.userRepository.findUserWithUserName(username);
    if (!user) {
      this.logger.error(`User ${username} not found`);
      throw new NotFoundException(`User ${username} not found`);
    }

    return user;
  }

  async create(user: CreateUserDto) {
    user.password = hashSync(user.password, genSaltSync(10));
    const result = await this.userRepository.create(user);
    if (result.rowCount <= 0) {
      this.logger.error(`Create user ${user.username} failed`);
      throw new BadRequestException(`Create user ${user.username} failed`);
    }

    return result;
  }
}
