import { Injectable } from '@nestjs/common';
import { PoolClient } from 'pg';
import { MyLogger } from '../../common/services/logger/logger.service';
import { ExecuteQueryResult, IActionTransaction } from '../../common/services/postgres/postgres.constant';
import { PostgresService } from '../../common/services/postgres/postgres.service';
import { patient } from '../../modules/patients/entities/patient.entity';
import { User } from '../../modules/user/entities/user.entity';

@Injectable()
export class PatientsRepository {
  constructor(
    private readonly postgresService: PostgresService,
    private readonly logger: MyLogger,
  ) {}

  async create(patient: patient): Promise<ExecuteQueryResult<patient>> {
    return this.postgresService.transaction(async (client: PoolClient, action: IActionTransaction) => {
      const sqlPathCreateUser = '/user/create_user.sql';
      await action.queryFile<User>(sqlPathCreateUser, [patient.username, patient.password, 'Patient'], client);

      const sqlPathCreatePatient = '/patients/create_patient.sql';
      return await action.queryFile<patient>(
        sqlPathCreatePatient,
        [
          patient.username,
          patient.firstName,
          patient.lastName,
          patient.dateOfBirth,
          patient.gender,
          patient.contactNumber,
          patient.email,
          patient.image,
          patient.address,
        ],
        client,
      );
    });
  }
}
