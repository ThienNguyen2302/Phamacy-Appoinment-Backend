import { IsDateString, IsNumber, IsString } from 'class-validator';

export class CreateAppointmentDto {
  @IsNumber()
  doctorId: number;

  @IsNumber()
  patientId: number;

  @IsDateString()
  startTime: string;

  @IsDateString()
  endTime: string;

  @IsString()
  purpose: string;
}
