import { Body, Controller, Get, Param, Patch, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { RolesAndGuard } from '../../decorators/roleAndGuard.decorator';
import { ERoleUser } from '../user/entities/user.entity';
import { DoctorService } from './doctor.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';

@Controller('Doctor')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @RolesAndGuard([ERoleUser.ADMIN])
  @UseInterceptors(FileInterceptor('image'))
  @Post()
  create(@UploadedFile() image: Express.Multer.File, @Body() body: CreateDoctorDto) {
    return this.doctorService.create(body, image);
  }

  @RolesAndGuard([ERoleUser.ADMIN])
  @Get()
  findAll() {
    return this.doctorService.findAll();
  }

  @RolesAndGuard([ERoleUser.DOCTOR, ERoleUser.ADMIN])
  @Get(':username')
  findOne(@Param('username') username: string) {
    return this.doctorService.findOne(username);
  }

  @RolesAndGuard([ERoleUser.DOCTOR, ERoleUser.ADMIN])
  @UseInterceptors(FileInterceptor('image'))
  @Patch()
  update(@Body() updateDoctorDto: UpdateDoctorDto, @UploadedFile() image: Express.Multer.File) {
    return this.doctorService.update(updateDoctorDto, image);
  }
}
