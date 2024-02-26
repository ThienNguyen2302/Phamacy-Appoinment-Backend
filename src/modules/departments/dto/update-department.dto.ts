import { IsNumber, IsString } from 'class-validator';

export class UpdateDepartmentDto {
  @IsString()
  name: string;
  @IsNumber()
  id: number;
}
