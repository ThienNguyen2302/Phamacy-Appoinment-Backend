import { IsNumberString, IsOptional } from 'class-validator';

export class QueryAppointmentsDto {
  @IsNumberString()
  @IsOptional()
  doctorId: number;

  @IsNumberString()
  @IsOptional()
  patientId: number;
}
