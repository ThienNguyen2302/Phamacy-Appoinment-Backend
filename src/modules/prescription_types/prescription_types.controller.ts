import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { RolesAndGuard } from '../../decorators/roleAndGuard.decorator';
import { CreatePrescriptionTypeDto } from './dto/create-prescription_type.dto';
import { UpdatePrescriptionTypeDto } from './dto/update-prescription_type.dto';
import { PrescriptionTypesService } from './prescription_types.service';
import { ERoleUser } from '../user/entities/user.entity';

@Controller('prescription-types')
export class PrescriptionTypesController {
  constructor(private readonly prescriptionTypesService: PrescriptionTypesService) {}

  @RolesAndGuard([ERoleUser.ADMIN])
  @Post()
  create(@Body() createPrescriptionTypeDto: CreatePrescriptionTypeDto) {
    return this.prescriptionTypesService.create(createPrescriptionTypeDto);
  }

  @RolesAndGuard([ERoleUser.DOCTOR, ERoleUser.ADMIN])
  @Get()
  findAll() {
    return this.prescriptionTypesService.findAll();
  }

  @RolesAndGuard([ERoleUser.DOCTOR, ERoleUser.ADMIN])
  @Patch()
  update(@Body() updatePrescriptionTypeDto: UpdatePrescriptionTypeDto) {
    return this.prescriptionTypesService.update(updatePrescriptionTypeDto);
  }

  @RolesAndGuard([ERoleUser.ADMIN])
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.prescriptionTypesService.remove(+id);
  }
}
