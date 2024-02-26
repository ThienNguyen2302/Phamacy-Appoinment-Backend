import { Injectable } from '@nestjs/common';
import { MyLogger } from '../../common/services/logger/logger.service';
import { ExecuteQueryResult } from '../../common/services/postgres/postgres.constant';
import { PostgresService } from '../../common/services/postgres/postgres.service';
import {
  IDepartmentCreate,
  IDepartmentInfo,
  IDepartmentUpdate,
} from '../../modules/departments/entities/department.entity';

@Injectable()
export class DepartmentRepository {
  constructor(
    private readonly postgresService: PostgresService,
    private readonly logger: MyLogger,
  ) {}

  async create(department: IDepartmentCreate): Promise<ExecuteQueryResult<IDepartmentCreate>> {
    const sqlPathCreatePatient = '/departments/create_department.sql';
    return await this.postgresService.executeQueryFromFile<IDepartmentCreate>(sqlPathCreatePatient, [department.name]);
  }

  async update(department: IDepartmentUpdate): Promise<ExecuteQueryResult<IDepartmentUpdate>> {
    const sqlPathCreatePatient = '/departments/update_department.sql';
    return await this.postgresService.executeQueryFromFile<IDepartmentUpdate>(sqlPathCreatePatient, [
      department.id,
      department.name,
    ]);
  }

  async find(id: number): Promise<IDepartmentInfo | null> {
    const sqlPath = '/departments/get_department.sql';
    const result = await this.postgresService.executeQueryFromFile<IDepartmentInfo>(sqlPath, [id]);
    return result?.rows?.length > 0 ? result?.rows[0] : null;
  }

  async findAll(): Promise<IDepartmentInfo[]> {
    const sqlPath = '/departments/get_departments.sql';
    return (await this.postgresService.executeQueryFromFile<IDepartmentInfo>(sqlPath, [])).rows || [];
  }
}
