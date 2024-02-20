import { Injectable } from '@nestjs/common';
import { MyLogger } from '../../common/services/logger/logger.service';
import { ExecuteQueryResult } from '../../common/services/postgres/postgres.constant';
import { PostgresService } from '../../common/services/postgres/postgres.service';
import { CreateUserDto } from '../../modules/user/dto/create-user.dto';
import { IUserBaseInfo, User } from '../../modules/user/entities/user.entity';

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
      user.role,
    ]);
    return result;
  }

  async findUserWithUserName(username: string): Promise<IUserBaseInfo | null> {
    const queryPath = '/user/get_user_by_username.sql';
    const result = await this.postgresService.executeQueryFromFile<IUserBaseInfo>(queryPath, [username]);
    return result?.rows?.length > 0 ? result.rows[0] : null;
  }
}
