import { Injectable } from '@nestjs/common';
import { MyLogger } from '../../common/services/logger/logger.service';
import { ExecuteQueryResult } from '../../common/services/postgres/postgres.constant';
import { PostgresService } from '../../common/services/postgres/postgres.service';
import {
  ICreatePrescriptionTypeCreate,
  ICreatePrescriptionTypeInfo,
  ICreatePrescriptionTypeUpdate,
} from '../../modules/prescription_types/entities/prescription_type.entity';

@Injectable()
export class PrescriptionTypesRepository {
  constructor(
    private readonly postgresService: PostgresService,
    private readonly logger: MyLogger,
  ) {}

  async create(
    prescriptionTypes: ICreatePrescriptionTypeCreate,
  ): Promise<ExecuteQueryResult<ICreatePrescriptionTypeCreate>> {
    const sqlPath = '/prescription_types/create_prescription_types.sql';
    return await this.postgresService.executeQueryFromFile<ICreatePrescriptionTypeCreate>(sqlPath, [
      prescriptionTypes.name,
    ]);
  }

  async update(
    prescriptionTypes: ICreatePrescriptionTypeUpdate,
  ): Promise<ExecuteQueryResult<ICreatePrescriptionTypeUpdate>> {
    const sqlPath = '/prescription_types/update_prescription_types.sql';
    return await this.postgresService.executeQueryFromFile<ICreatePrescriptionTypeUpdate>(sqlPath, [
      prescriptionTypes.id,
      prescriptionTypes.name,
    ]);
  }

  async delete(id: number): Promise<ExecuteQueryResult<number>> {
    const sqlPath = '/prescription_types/delete_prescription_types.sql';
    return await this.postgresService.executeQueryFromFile<number>(sqlPath, [id]);
  }

  async findAll(): Promise<ICreatePrescriptionTypeInfo[]> {
    const sqlPath = '/prescription_types/get_prescriptions_types.sql';
    return (await this.postgresService.executeQueryFromFile<ICreatePrescriptionTypeInfo>(sqlPath, [])).rows || [];
  }
}
