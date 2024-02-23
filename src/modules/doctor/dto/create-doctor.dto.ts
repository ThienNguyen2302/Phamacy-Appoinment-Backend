import { IsDateString, IsEmail, IsNumberString, IsString } from 'class-validator';

export class CreateDoctorDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  description: string;

  @IsNumberString()
  departmentId: number;

  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsString()
  contactNumber: string;

  @IsEmail()
  email: string;

  @IsDateString()
  dateOfBirth: string;

  @IsString()
  address: string;

  @IsString()
  gender: string;
}
