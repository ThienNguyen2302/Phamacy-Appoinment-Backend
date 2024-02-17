import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { HealthService } from './health.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhysicalHealth } from './entities/physical-health.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [HealthController],
  providers: [HealthService],
  imports: [
    TypeOrmModule.forFeature([PhysicalHealth]),
    UsersModule
  ],
  exports: []
})
export class HealthModule { }
