// postgres.module.ts
import { Module } from '@nestjs/common';
import { PostgresService } from './postgres.service';
import { MyLoggerModule } from '../logger/logger.module';

@Module({
  imports: [MyLoggerModule],
  providers: [PostgresService],
  exports: [PostgresService],
})
export class PostgresModule {}
