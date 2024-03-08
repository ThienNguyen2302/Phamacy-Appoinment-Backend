import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';

export class CreatePrescriptionDto {
  @IsNumber()
  appointmentId: number;

  @IsString()
  @IsOptional()
  notes?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PrescriptionDetailsDto)
  prescriptionDetails: PrescriptionDetailsDto[];
}

export class PrescriptionDetailsDto {
  @IsNumber()
  prescriptionTypeId: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsDto)
  details: DetailsDto[];
}

export class DetailsDto {
  @IsString()
  examinationContent: string;

  @IsString()
  classification: string;

  @IsString()
  @IsOptional()
  notes?: string;
}
