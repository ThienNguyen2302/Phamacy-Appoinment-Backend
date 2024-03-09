import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreatePrescriptionDto } from './dto/create-prescription.dto';
import { PrescriptionsService } from './prescriptions.service';
import { GetPrescriptionDto } from './dto/get-prescription.dto';
import { RolesAndGuard } from '../../decorators/roleAndGuard.decorator';
import { ERoleUser } from '../user/entities/user.entity';

@Controller('prescriptions')
export class PrescriptionsController {
  constructor(private readonly prescriptionsService: PrescriptionsService) {}

  @RolesAndGuard([ERoleUser.DOCTOR])
  @Post()
  create(@Body() createPrescriptionDto: CreatePrescriptionDto) {
    return this.prescriptionsService.create(createPrescriptionDto);
  }

  @Get(':id')
  findOne(@Param() params: GetPrescriptionDto) {
    return this.prescriptionsService.findOne(Number(params.id));
  }
}
