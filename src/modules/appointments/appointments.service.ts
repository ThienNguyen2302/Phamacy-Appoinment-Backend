import { BadRequestException, Injectable } from '@nestjs/common';
import { MyLogger } from '../../common/services/logger/logger.service';
import { AppointmentsRepository } from '../../repositories/appointments/appointments.repository.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import {
  EAppointmentStatus,
  IAppointmentsCreate,
  IAppointmentsInfo,
  IAppointmentsUpdate,
  IQueryParamsFindAll,
  IScheduleAppointmentDoctor,
} from './entities/appointment.entity';

@Injectable()
export class AppointmentsService {
  constructor(
    private readonly appointmentsRepository: AppointmentsRepository,
    private readonly logger: MyLogger,
  ) {}

  async create(createAppointmentDto: CreateAppointmentDto) {
    try {
      if (
        createAppointmentDto.startTime >= createAppointmentDto.endTime ||
        new Date(createAppointmentDto.startTime) <= new Date()
      ) {
        throw new BadRequestException('Time appointment is in valid');
      }
      const scheduleDoctor: IScheduleAppointmentDoctor = await this.appointmentsRepository.getSchedulesDoctor(
        createAppointmentDto.doctorId,
        createAppointmentDto.startTime,
        createAppointmentDto.endTime,
      );
      if (scheduleDoctor?.appointments?.length > 0) {
        throw new BadRequestException('The doctor is scheduled for examination during this time');
      }

      const creatAppointmentParams: IAppointmentsCreate = {
        ...createAppointmentDto,
        status: EAppointmentStatus.WAITING,
      };
      return this.appointmentsRepository.create(creatAppointmentParams);
    } catch (error) {
      this.logger.error(`Create appointment failed`);
      throw error;
    }
  }

  async update(updateAppointmentDto: UpdateAppointmentDto) {
    try {
      if (
        updateAppointmentDto.startTime >= updateAppointmentDto.endTime ||
        new Date(updateAppointmentDto.startTime) <= new Date()
      ) {
        throw new BadRequestException('Time appointment is in valid');
      }
      const scheduleDoctor: IScheduleAppointmentDoctor =
        await this.appointmentsRepository.getSchedulesDoctorNotCurrentSchedule(
          updateAppointmentDto.id,
          updateAppointmentDto.doctorId,
          updateAppointmentDto.startTime,
          updateAppointmentDto.endTime,
        );
      if (scheduleDoctor?.appointments?.length > 0) {
        throw new BadRequestException('The doctor is scheduled for examination during this time');
      }

      const updateAppointmentParams: IAppointmentsUpdate = {
        ...updateAppointmentDto,
      };
      return this.appointmentsRepository.update(updateAppointmentParams);
    } catch (error) {
      this.logger.error(`Update appointment failed`);
      throw error;
    }
  }

  async findAll(param: IQueryParamsFindAll) {
    const scheduleDoctor: IAppointmentsInfo[] = await this.appointmentsRepository.getAppointments(param);
    return scheduleDoctor;
  }

  async findOne(id: number) {
    const scheduleDoctor: IAppointmentsInfo | null = await this.appointmentsRepository.getAppointment(id);
    return scheduleDoctor;
  }
}
