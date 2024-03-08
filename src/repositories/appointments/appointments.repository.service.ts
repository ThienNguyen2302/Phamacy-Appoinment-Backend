import { Injectable } from '@nestjs/common';
import { MyLogger } from '../../common/services/logger/logger.service';
import { ExecuteQueryResult } from '../../common/services/postgres/postgres.constant';
import { PostgresService } from '../../common/services/postgres/postgres.service';
import {
  IAppointmentsCreate,
  IAppointmentsInfo,
  IAppointmentsUpdate,
  IChangeStatusAppointment,
  IQueryParamsFindAll,
  IScheduleAppointmentDoctor,
} from '../../modules/appointments/entities/appointment.entity';

@Injectable()
export class AppointmentsRepository {
  constructor(
    private readonly postgresService: PostgresService,
    private readonly logger: MyLogger,
  ) {}

  async create(appointment: IAppointmentsCreate): Promise<ExecuteQueryResult<IAppointmentsCreate>> {
    const sqlPathCreatePatient = '/appointments/create_appointment.sql';
    return await this.postgresService.executeQueryFromFile<IAppointmentsCreate>(sqlPathCreatePatient, [
      appointment.doctorId,
      appointment.patientId,
      appointment.startTime,
      appointment.endTime,
      appointment.purpose,
      appointment.status,
    ]);
  }

  async update(appointment: IAppointmentsUpdate): Promise<ExecuteQueryResult<IAppointmentsUpdate>> {
    const sqlPathCreatePatient = '/appointments/update_appointment.sql';
    return await this.postgresService.executeQueryFromFile<IAppointmentsUpdate>(sqlPathCreatePatient, [
      appointment.id,
      appointment.doctorId,
      appointment.patientId,
      appointment.startTime,
      appointment.endTime,
      appointment.purpose,
    ]);
  }

  async find(id: number): Promise<IAppointmentsInfo | null> {
    const sqlPath = '/appointments/get_appointment.sql';
    const result = await this.postgresService.executeQueryFromFile<IAppointmentsInfo>(sqlPath, [id]);
    return result?.rows?.length > 0 ? result?.rows[0] : null;
  }

  async findAll(): Promise<IAppointmentsInfo[]> {
    const sqlPath = '/appointments/get_appointments.sql';
    return (await this.postgresService.executeQueryFromFile<IAppointmentsInfo>(sqlPath, [])).rows || [];
  }

  async getSchedulesDoctor(
    doctorId: number,
    startTime: string,
    endTime: string,
  ): Promise<IScheduleAppointmentDoctor | null> {
    const sqlPath = '/appointments/get_schedules_doctor.sql';
    const result = await this.postgresService.executeQueryFromFile<IScheduleAppointmentDoctor>(sqlPath, [
      doctorId,
      startTime,
      endTime,
    ]);
    return result?.rows?.length > 0 ? result.rows[0] : null;
  }

  async getSchedulesDoctorNotCurrentSchedule(
    scheduledId: number,
    doctorId: number,
    startTime: string,
    endTime: string,
  ): Promise<IScheduleAppointmentDoctor | null> {
    const sqlPath = '/appointments/get_schedules_doctor_not_current_schedule.sql';
    const result = await this.postgresService.executeQueryFromFile<IScheduleAppointmentDoctor>(sqlPath, [
      doctorId,
      startTime,
      endTime,
      scheduledId,
    ]);
    return result?.rows?.length > 0 ? result.rows[0] : null;
  }

  async getAppointments(params: IQueryParamsFindAll): Promise<IAppointmentsInfo[]> {
    const sqlPath = '/appointments/get_appointments.sql';
    const result = await this.postgresService.executeQueryFromFile<IAppointmentsInfo>(sqlPath, [
      params.doctorId,
      params.patientId,
    ]);
    return result.rows;
  }

  async getAppointment(id: number): Promise<IAppointmentsInfo | null> {
    const sqlPath = '/appointments/get_appointment.sql';
    const result = await this.postgresService.executeQueryFromFile<IAppointmentsInfo>(sqlPath, [id]);
    return result.rows.length > 0 ? result.rows[0] : null;
  }

  async changeStatus(params: IChangeStatusAppointment) {
    const sqlPath = '/appointments/change_status_appointment.sql';
    return await this.postgresService.executeQueryFromFile<null>(sqlPath, [params.id, params.status]);
  }
}
