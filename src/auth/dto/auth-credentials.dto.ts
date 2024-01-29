import { IsString, MinLength, MaxLength, Matches, IsEmail, IsPhoneNumber } from 'class-validator';

export class AuthCredentialsDto {
  @IsString({ message: 'Username must be a string' })
  @MinLength(4, { message: 'Username must be at least 4 characters long' })
  @MaxLength(20, { message: 'Username cannot be longer than 20 characters' })
  username: string;

  @IsString({ message: 'Password must be a string' })
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @MaxLength(32, { message: 'Password cannot be longer than 32 characters' })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password is too weak. It must contain at least one uppercase letter, one lowercase letter, one digit, and one special character.',
  })
  password: string;

  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @IsPhoneNumber('VN', { message: 'Invalid phone number from Vietnam' })
  contact_number: string;
}