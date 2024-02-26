import { Injectable } from '@nestjs/common';
import { MyLogger } from '../../common/services/logger/logger.service';
import { DepartmentRepository } from '../../repositories/departments/departments.repository.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { IDepartmentInfo } from './entities/department.entity';

@Injectable()
export class DepartmentsService {
  constructor(
    private readonly departmentRepository: DepartmentRepository,
    private readonly logger: MyLogger,
  ) {}

  async create(createDepartmentDto: CreateDepartmentDto) {
    try {
      return await this.departmentRepository.create(createDepartmentDto);
    } catch (error) {
      this.logger.error(`Create department ${createDepartmentDto.name} failer`);
      throw error;
    }
  }

  async findAll(): Promise<IDepartmentInfo[]> {
    try {
      return await this.departmentRepository.findAll();
    } catch (error) {
      this.logger.error(`Find all department failer`);
      throw error;
    }
  }

  async findOne(id: number): Promise<IDepartmentInfo> {
    try {
      return await this.departmentRepository.find(id);
    } catch (error) {
      this.logger.error(`Find ${id} department failer`);
      throw error;
    }
  }

  async update(updateDepartmentDto: UpdateDepartmentDto) {
    try {
      return await this.departmentRepository.update(updateDepartmentDto);
    } catch (error) {
      this.logger.error(`Update department ${updateDepartmentDto.name} failer`);
      throw error;
    }
  }
}
