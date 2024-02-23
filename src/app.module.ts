import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MyLogger } from './common/services/logger/logger.service';
import { AuthModule } from './modules/auth/auth.module';
import { DoctorModule } from './modules/doctor/doctor.module';
import { PatientsModule } from './modules/patients/patients.module';
import { UsersModule } from './modules/user/users.module';

@Module({
  imports: [ConfigModule.forRoot(), UsersModule, AuthModule, PatientsModule, DoctorModule],
  controllers: [],
  providers: [{ provide: 'LoggerService', useClass: MyLogger }],
})
export class AppModule {}
