import { Injectable } from '@nestjs/common';
import { PoolClient } from 'pg';
import { MyLogger } from '../../common/services/logger/logger.service';
import { ExecuteQueryResult } from '../../common/services/postgres/postgres.constant';
import { PostgresService } from '../../common/services/postgres/postgres.service';
import { IDoctorCreate, IDoctorInfo, IDoctorUpdate } from '../../modules/doctor/entities/doctor.entity';
import { User } from '../../modules/user/entities/user.entity';

@Injectable()
export class DoctorRepository {
  constructor(
    private readonly postgresService: PostgresService,
    private readonly logger: MyLogger,
  ) {}

  async create(doctor: IDoctorCreate): Promise<ExecuteQueryResult<IDoctorCreate>> {
    return this.postgresService.transaction(async (client: PoolClient) => {
      const sqlPathCreateUser = '/user/create_user.sql';
      await this.postgresService.transactionQueryFile<User>(
        sqlPathCreateUser,
        [doctor.username, doctor.password, 'Doctor'],
        client,
      );

      const sqlPathCreatePatient = '/doctor/create_doctor.sql';
      return await this.postgresService.transactionQueryFile<IDoctorCreate>(
        sqlPathCreatePatient,
        [
          doctor.firstName,
          doctor.lastName,
          doctor.description,
          doctor.departmentId,
          doctor.username,
          doctor.contactNumber,
          doctor.email,
          doctor.dateOfBirth,
          doctor.address,
          doctor.gender,
          doctor.image,
        ],
        client,
      );
    });
  }

  async update(doctor: IDoctorUpdate): Promise<ExecuteQueryResult<IDoctorUpdate>> {
    const sqlPathCreatePatient = '/doctor/update_doctor.sql';
    return await this.postgresService.executeQueryFromFile<IDoctorUpdate>(sqlPathCreatePatient, [
      doctor.username,
      doctor.firstName,
      doctor.lastName,
      doctor.description,
      doctor.departmentId,
      doctor.contactNumber,
      doctor.email,
      doctor.dateOfBirth,
      doctor.address,
      doctor.gender,
      doctor.image,
    ]);
  }

  async find(username: string): Promise<IDoctorInfo | null> {
    const sqlPath = '/doctor/get_doctor.sql';
    const result = await this.postgresService.executeQueryFromFile<IDoctorInfo>(sqlPath, [username]);
    return result?.rows?.length > 0 ? result?.rows[0] : null;
  }

  async findAll(): Promise<IDoctorInfo[]> {
    const sqlPath = '/doctor/get_doctors.sql';
    return (await this.postgresService.executeQueryFromFile<IDoctorInfo>(sqlPath, [])).rows || [];
  }
}
