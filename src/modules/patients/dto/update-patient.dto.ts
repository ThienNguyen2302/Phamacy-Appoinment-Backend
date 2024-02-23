import { OmitType } from '@nestjs/mapped-types';
import { CreatePatientDto } from './create-patient.dto';

export class UpdatePatientDto extends OmitType(CreatePatientDto, ['password'] as const) {}
