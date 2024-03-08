import { BadRequestException, Injectable } from '@nestjs/common';
import { genSaltSync, hashSync } from 'bcrypt';
import { MyLogger } from '../../../common/services/logger/logger.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserRepository } from './../../../repositories/user/user.repository.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly logger: MyLogger,
  ) {}

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
