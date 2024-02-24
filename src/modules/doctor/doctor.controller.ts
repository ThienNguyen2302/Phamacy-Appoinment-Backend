import { Body, Controller, Get, Param, Patch, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DoctorService } from './doctor.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { RolesAndGuard } from '../../decorators/roleAndGuard.decorator';

@Controller('doctor')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @RolesAndGuard(['admin'])
  @UseInterceptors(FileInterceptor('image'))
  @Post()
  create(@UploadedFile() image: Express.Multer.File, @Body() body: CreateDoctorDto) {
    return this.doctorService.create(body, image);
  }

  @RolesAndGuard(['admin'])
  @Get()
  findAll() {
    return this.doctorService.findAll();
  }

  @RolesAndGuard(['Doctor', 'admin'])
  @Get(':username')
  findOne(@Param('username') username: string) {
    return this.doctorService.findOne(username);
  }

  @RolesAndGuard(['Doctor', 'admin'])
  @UseInterceptors(FileInterceptor('image'))
  @Patch()
  update(@Body() updateDoctorDto: UpdateDoctorDto, @UploadedFile() image: Express.Multer.File) {
    return this.doctorService.update(updateDoctorDto, image);
  }
}
