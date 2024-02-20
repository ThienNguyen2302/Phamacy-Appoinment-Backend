import { Body, Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PublicRouter } from '../../decorators/public-router.decorator';
import { CreatePatientDto } from './dto/create-patient.dto';
import { PatientsService } from './patients.service';

@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @PublicRouter()
  @UseInterceptors(FileInterceptor('image'))
  @Post()
  create(@UploadedFile() image: Express.Multer.File, @Body() body: CreatePatientDto) {
    return this.patientsService.create(body, image);
  }

  @Get()
  findAll() {}
}
