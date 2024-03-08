import { BadRequestException, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { PoolClient } from 'pg';
import { MyLogger } from '../../common/services/logger/logger.service';
import { ExecuteQueryResult } from '../../common/services/postgres/postgres.constant';
import { PostgresService } from '../../common/services/postgres/postgres.service';
import { CreateUserDto } from '../../modules/user/dto/create-user.dto';
import { ERoleUser, IUserBase, IUserBaseInfo, User } from '../../modules/user/entities/user.entity';

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
    return this.postgresService.transaction(async (client: PoolClient) => {
      const queryPath = '/user/get_user_by_username.sql';
      const userBase = (await this.postgresService.transactionQueryFile<IUserBase>(queryPath, [username], client))
        ?.rows[0];
      if (!userBase) return null;

      const tableName = this._getTableName(userBase.role);

      const sqlPathCreatePatient = path.join(__dirname, `../../assets/sql/user/get_user_info_by_username.sql`);
      const queryContent = fs.readFileSync(sqlPathCreatePatient, 'utf-8');
      if (!queryContent) {
        throw new BadRequestException(`Can't read contents file sql`);
      }
      const newContentQuery = queryContent.replace('[table_name]', `"${tableName}"`);
      const result = await this.postgresService.query<IUserBaseInfo>(newContentQuery, [userBase.username], client);
      return result.rows.length > 0 ? result?.rows[0] : null;
    });
  }

  _getTableName(tableName) {
    if (tableName === ERoleUser.DOCTOR) {
      return 'doctors';
    } else if (tableName === ERoleUser.ADMIN) {
      return 'admins';
    } else {
      return 'patients';
    }
  }
}
