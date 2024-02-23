import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MyLoggerModule } from '../logger/logger.module';
import { CloudinaryService } from './cloudinary.service';

@Module({
  imports: [MyLoggerModule, ConfigModule],
  providers: [CloudinaryService],
  exports: [CloudinaryService],
})
export class CloudinaryModule {}
