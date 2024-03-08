import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { RolesAndGuard } from '../../decorators/roleAndGuard.decorator';
import { ERoleUser } from '../user/entities/user.entity';
import { AppointmentsService } from './appointments.service';
import { ChangeStatusAppointmentDto } from './dto/change-status-appointment.dto';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { QueryAppointmentsDto } from './dto/query-appointments.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { IQueryParamsFindAll } from './entities/appointment.entity';

@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Post()
  create(@Body() createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentsService.create(createAppointmentDto);
  }

  @Get()
  findAll(@Query() queryParams: QueryAppointmentsDto) {
    const param: IQueryParamsFindAll = {
      doctorId: queryParams?.doctorId ? Number(queryParams.doctorId) : null,
      patientId: queryParams?.patientId ? Number(queryParams.patientId) : null,
    };
    return this.appointmentsService.findAll(param);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.appointmentsService.findOne(+id);
  }

  @Patch()
  update(@Body() updateAppointmentDto: UpdateAppointmentDto) {
    return this.appointmentsService.update(updateAppointmentDto);
  }

  @RolesAndGuard([ERoleUser.DOCTOR])
  @Patch('/change-status')
  changeStatus(@Body() params: ChangeStatusAppointmentDto) {
    return this.appointmentsService.changeStatus(params);
  }
}
