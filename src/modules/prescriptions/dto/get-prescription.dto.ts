import { IsNumberString } from 'class-validator';

export class GetPrescriptionDto {
  @IsNumberString()
  id: string;
}
