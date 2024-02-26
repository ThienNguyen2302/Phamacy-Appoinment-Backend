import { Module } from '@nestjs/common';
import { MyLoggerModule } from '../../common/services/logger/logger.module';
import { PostgresModule } from '../../common/services/postgres/postgres.module';
import { DepartmentRepository } from './departments.repository.service';

@Module({
  imports: [PostgresModule, MyLoggerModule],
  providers: [DepartmentRepository],
  exports: [DepartmentRepository],
})
export class DepartmentRepositoryModule {}
