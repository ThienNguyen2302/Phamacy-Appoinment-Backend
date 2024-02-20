import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { PatientsRepository } from '../../repositories/patients/patients.repository.service';
import { MyLogger } from '../../common/services/logger/logger.service';

@Injectable()
export class PatientsService {
  constructor(
    private readonly patientsRepository: PatientsRepository,
    private readonly logger: MyLogger,
  ) {}
  async create(createPatientDto: CreatePatientDto) {
    const result = await this.patientsRepository.create(createPatientDto);
    if (result.rowCount <= 0) {
      this.logger.error(`Create Patient ${createPatientDto.username} failed`);
      throw new BadRequestException(`Create Patient ${createPatientDto.username} failed`);
    }

    return result;
  }

  findAll() {
    return `This action returns all patients`;
  }
}
