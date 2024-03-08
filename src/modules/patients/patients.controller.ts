import { Body, Controller, Get, Param, Patch, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PublicRouter } from '../../decorators/public-router.decorator';
import { RolesAndGuard } from '../../decorators/roleAndGuard.decorator';
import { ERoleUser } from '../user/entities/user.entity';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
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

  @RolesAndGuard([ERoleUser.PATIENT, ERoleUser.ADMIN])
  @UseInterceptors(FileInterceptor('image'))
  @Patch()
  update(@UploadedFile() image: Express.Multer.File, @Body() body: UpdatePatientDto) {
    return this.patientsService.update(body, image);
  }

  @RolesAndGuard([ERoleUser.PATIENT, ERoleUser.ADMIN])
  @Get(':username')
  find(@Param('username') username: string) {
    return this.patientsService.find(username);
  }

  @RolesAndGuard([ERoleUser.PATIENT, ERoleUser.ADMIN])
  @Get()
  findAll() {
    return this.patientsService.findAll();
  }
}
