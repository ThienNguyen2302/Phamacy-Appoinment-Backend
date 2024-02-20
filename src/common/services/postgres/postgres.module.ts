// postgres.module.ts
import { Module } from '@nestjs/common';
import { PostgresService } from './postgres.service';
import { MyLoggerModule } from '../logger/logger.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [MyLoggerModule, ConfigModule],
  providers: [PostgresService],
  exports: [PostgresService],
})
export class PostgresModule {}
