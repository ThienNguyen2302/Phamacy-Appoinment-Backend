import { IsNumber } from 'class-validator';
import { CreatePrescriptionTypeDto } from './create-prescription_type.dto';

export class UpdatePrescriptionTypeDto extends CreatePrescriptionTypeDto {
  @IsNumber()
  id: number;
}
