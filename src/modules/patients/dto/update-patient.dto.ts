import { OmitType } from '@nestjs/mapped-types';
import { IsString } from 'class-validator';
import { CreatePatientDto } from './create-patient.dto';

export class UpdatePatientDto extends OmitType(CreatePatientDto, ['password'] as const) {
  @IsString()
  imageUrl: string;
}
