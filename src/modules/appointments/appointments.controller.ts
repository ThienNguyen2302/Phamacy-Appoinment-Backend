import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { IQueryParamsFindAll } from './entities/appointment.entity';
import { QueryAppointmentsDto } from './dto/query-appointments.dto';

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
}
