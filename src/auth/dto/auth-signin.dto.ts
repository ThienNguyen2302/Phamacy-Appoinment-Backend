import { IsNotEmpty, IsString } from 'class-validator';

export class AuthSignInDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}