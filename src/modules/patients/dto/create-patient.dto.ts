import { IsDateString, IsEmail, IsString } from 'class-validator';

export class CreatePatientDto {
  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsDateString()
  dateOfBirth: string;

  @IsString()
  gender: string;

  @IsString()
  contactNumber: string;

  @IsEmail()
  email: string;

  @IsString()
  address: string;
}
