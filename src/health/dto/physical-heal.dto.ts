import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class PhysicalHealthDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  height: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  weight: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  pulse: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  bloodPressure: number;
}
