import { BadRequestException, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { PoolClient } from 'pg';
import { MyLogger } from '../../common/services/logger/logger.service';
import { PostgresService } from '../../common/services/postgres/postgres.service';
import { IPrescriptionCreate, IPrescriptionDetail } from '../../modules/prescriptions/entities/prescription.entity';
import { RolesAndGuard } from '../../decorators/roleAndGuard.decorator';
import { ERoleUser } from '../../modules/user/entities/user.entity';

@Injectable()
export class PrescriptionsRepository {
  constructor(
    private readonly postgresService: PostgresService,
    private readonly logger: MyLogger,
  ) {}

  @RolesAndGuard([ERoleUser.DOCTOR])
  async create(parmas: IPrescriptionCreate) {
    return this.postgresService.transaction(async (client: PoolClient) => {
      const sqlInserPrescription = '/prescriptions/create_prescription.sql';
      const resultCreatePrescription = await this.postgresService.transactionQueryFile<{ id: number }>(
        sqlInserPrescription,
        [parmas.appointmentId, parmas?.notes ? parmas.notes : null],
        client,
      );
      const idNewPrescription = resultCreatePrescription.rows.length > 0 ? resultCreatePrescription.rows[0].id : null;
      if (!idNewPrescription) throw new BadRequestException(`Craeat prescription failed`);

      let sqlInsertPrescriptionDetails = '';
      parmas.prescriptionDetails.forEach((p) => {
        p.details.forEach((d) => {
          sqlInsertPrescriptionDetails += `(${idNewPrescription}, ${p.prescriptionTypeId}, ${
            d.notes ? `'${d.notes}'` : null
          }, '${d.examinationContent}', '${d.classification}'),`;
        });
      });

      const sqlPathCreatePrescriptionDetails = path.join(
        __dirname,
        `../../assets/sql/prescription_details/create_prescription_details.sql`,
      );
      const queryContent = fs.readFileSync(sqlPathCreatePrescriptionDetails, 'utf-8');
      if (!queryContent) {
        throw new BadRequestException(`Can't read contents file sql`);
      }
      const newContentQuery = queryContent.replace('[replaced]', `${sqlInsertPrescriptionDetails.slice(0, -1)}`);
      return await this.postgresService.query(newContentQuery, [], client);
    });
  }

  async findOneById(id: number): Promise<IPrescriptionDetail> {
    const sqlPath = '/prescriptions/get_prescription.sql';

    const result = await this.postgresService.executeQueryFromFile<IPrescriptionDetail>(sqlPath, [id]);
    return result.rows.length > 0 ? result.rows[0] : null;
  }
}
