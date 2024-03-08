import { Injectable } from '@nestjs/common';
import { MyLogger } from '../../common/services/logger/logger.service';
import { PrescriptionTypesRepository } from '../../repositories/prescription_types/prescription_types.repository.service';
import { CreatePrescriptionTypeDto } from './dto/create-prescription_type.dto';
import { UpdatePrescriptionTypeDto } from './dto/update-prescription_type.dto';

@Injectable()
export class PrescriptionTypesService {
  constructor(
    private readonly prescriptionTypesRepository: PrescriptionTypesRepository,
    private readonly logger: MyLogger,
  ) {}
  async create(createPrescriptionTypeDto: CreatePrescriptionTypeDto) {
    try {
      return await this.prescriptionTypesRepository.create(createPrescriptionTypeDto);
    } catch (error) {
      this.logger.error(`Create prescription types ${createPrescriptionTypeDto.name} failer`);
      throw error;
    }
  }

  async findAll() {
    try {
      return await this.prescriptionTypesRepository.findAll();
    } catch (error) {
      this.logger.error(`Get list prescription types failer`);
      throw error;
    }
  }

  async update(updatePrescriptionTypeDto: UpdatePrescriptionTypeDto) {
    try {
      return await this.prescriptionTypesRepository.update(updatePrescriptionTypeDto);
    } catch (error) {
      this.logger.error(`Update prescription types ${updatePrescriptionTypeDto.name} failer`);
      throw error;
    }
  }
  async remove(id: number) {
    try {
      return await this.prescriptionTypesRepository.delete(id);
    } catch (error) {
      this.logger.error(`Delete prescription types failer`);
      throw error;
    }
  }
}
