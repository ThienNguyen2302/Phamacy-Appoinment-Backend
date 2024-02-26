import { Module } from '@nestjs/common';
import { DepartmentsService } from './departments.service';
import { DepartmentsController } from './departments.controller';
import { MyLoggerModule } from '../../common/services/logger/logger.module';
import { DepartmentRepositoryModule } from '../../repositories/departments/departments.repository.module';

@Module({
  controllers: [DepartmentsController],
  providers: [DepartmentsService],
  imports: [DepartmentRepositoryModule, MyLoggerModule],
})
export class DepartmentsModule {}
