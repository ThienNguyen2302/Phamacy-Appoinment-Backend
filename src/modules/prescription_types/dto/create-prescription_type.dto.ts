import { IsString } from 'class-validator';

export class CreatePrescriptionTypeDto {
  @IsString()
  name: string;
}
