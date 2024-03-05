import { IsNumber } from 'class-validator';
import { CreateAppointmentDto } from './create-appointment.dto';

export class UpdateAppointmentDto extends CreateAppointmentDto {
  @IsNumber()
  id: number;
}
