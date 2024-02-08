// update-user.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty()
  @IsString()
  full_name: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  date_of_birth: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  address: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  gender: string;

  // You may include other fields as needed
}

