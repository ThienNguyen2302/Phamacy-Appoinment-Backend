// update-user.dto.ts

import { IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  full_name: string;

  @IsString()
  @IsOptional()
  date_of_birth: string;

  @IsString()
  @IsOptional()
  address: string;

  @IsString()
  @IsOptional()
  gender: string;

  // You may include other fields as needed
}

