import { IsEnum, IsNumber } from 'class-validator';
import { EAppointmentStatus } from '../entities/appointment.entity';

export class ChangeStatusAppointmentDto {
  @IsNumber()
  id: number;

  @IsEnum(EAppointmentStatus)
  status: EAppointmentStatus;
}
