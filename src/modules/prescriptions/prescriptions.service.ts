import { BadRequestException, Injectable } from '@nestjs/common';
import { MyLogger } from '../../common/services/logger/logger.service';
import { AppointmentsRepository } from '../../repositories/appointments/appointments.repository.service';
import { PrescriptionsRepository } from '../../repositories/prescriptions/prescriptions.repository.service';
import { IPrescriptionCreate, IPrescriptionDetail } from './entities/prescription.entity';

@Injectable()
export class PrescriptionsService {
  constructor(
    private readonly prescriptionsRepository: PrescriptionsRepository,
    private readonly logger: MyLogger,
    private readonly appointmentsRepository: AppointmentsRepository,
  ) {}

  async create(params: IPrescriptionCreate) {
    try {
      const appointment = await this.appointmentsRepository.find(params.appointmentId);
      if (!appointment) {
        throw new BadRequestException(`Appointment not exits`);
      }
      if (
        new Date().toISOString() < new Date(appointment.startTime).toISOString() ||
        new Date().toISOString() > new Date(appointment.endTime).toISOString()
      ) {
        throw new BadRequestException(`Time created prescription in valid`);
      }
      return await this.prescriptionsRepository.create(params);
    } catch (error) {
      this.logger.error(`Create Prescription Error!`);
      throw error;
    }
  }

  async findOne(id: number): Promise<IPrescriptionDetail> {
    try {
      return await this.prescriptionsRepository.findOneById(id);
    } catch (error) {
      this.logger.error(`Get prescription failer`);
      throw error;
    }
  }
}
