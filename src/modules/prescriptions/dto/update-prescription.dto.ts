import { IsNumber } from 'class-validator';
import { CreatePrescriptionDto } from './create-prescription.dto';

export class UpdatePrescriptionDto extends CreatePrescriptionDto {
  @IsNumber()
  id: number;
}
