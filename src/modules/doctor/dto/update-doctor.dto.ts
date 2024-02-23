import { OmitType } from '@nestjs/mapped-types';
import { CreateDoctorDto } from './create-doctor.dto';

export class UpdateDoctorDto extends OmitType(CreateDoctorDto, ['password'] as const) {}
