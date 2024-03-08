import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MyLogger } from './common/services/logger/logger.service';
import { AppointmentsModule } from './modules/appointments/appointments.module';
import { AuthModule } from './modules/auth/auth.module';
import { DepartmentsModule } from './modules/departments/departments.module';
import { DoctorModule } from './modules/doctor/doctor.module';
import { PatientsModule } from './modules/patients/patients.module';
import { PrescriptionTypesModule } from './modules/prescription_types/prescription_types.module';
import { PrescriptionsModule } from './modules/prescriptions/prescriptions.module';
import { UsersModule } from './modules/user/users.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    AuthModule,
    PatientsModule,
    DoctorModule,
    DepartmentsModule,
    AppointmentsModule,
    PrescriptionTypesModule,
    PrescriptionsModule,
  ],
  controllers: [],
  providers: [{ provide: 'LoggerService', useClass: MyLogger }],
})
export class AppModule {}
