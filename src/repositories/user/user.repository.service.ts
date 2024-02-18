import { Injectable } from '@nestjs/common';
import { PostgresService } from '../../common/services/postgres/postgres.service';
import { MyLogger } from '../../common/services/logger/logger.service';
import { User } from '../../modules/user/entities/user.entity';
import { CreateUserDto } from 'src/modules/user/dto/create-user.dto';
import { ExecuteQueryResult } from 'src/common/services/postgres/postgres.constant';

@Injectable()
export class UserRepository {
  constructor(
    private readonly postgresService: PostgresService,
    private readonly logger: MyLogger,
  ) {}

  async create(user: CreateUserDto): Promise<ExecuteQueryResult<User>> {
    const queryPath = '/user/create_user.sql';
    const result = await this.postgresService.executeQueryFromFile<User>(queryPath, [
      user.username,
      user.password,
      user.fullName,
      user.email,
      user.phoneNumber,
      user.address,
    ]);
    return result;
  }

  async findUserWithUserName(username: string): Promise<User | null> {
    const queryPath = '/user/get_user_with_username.sql';
    const result = await this.postgresService.executeQueryFromFile<User>(queryPath, [username]);
    return result?.rows?.length > 0 ? result.rows[0] : null;
  }
}
