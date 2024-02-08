import { Module } from '@nestjs/common';
import { DoctorsController } from './doctors.controller';
import { AuthModule } from '../auth/auth.module';
import { DoctorsService } from './doctors.service';

@Module({
    controllers: [DoctorsController],
    providers: [DoctorsService],
    imports: [AuthModule,
        
    ],
    exports:[],
})
export class DoctorsModule {}
