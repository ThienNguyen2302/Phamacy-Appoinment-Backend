import { IsEmail, IsNumberString, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsString()
  fullName: string;

  @IsEmail()
  email: string;

  @IsNumberString()
  phoneNumber: string;

  @IsString()
  address: string;
}
