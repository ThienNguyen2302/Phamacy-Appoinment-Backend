import { Body, Controller, Get, NotFoundException, Param, Put } from '@nestjs/common';
import { HealthService } from './health.service';
import { PhysicalHealth } from './entities/physical-health.entity';
import { UsersService } from 'src/users/users.service';
import { PhysicalHealthDto } from './dto/physical-heal.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('health')
@Controller('health')
export class HealthController {
    constructor(
        private healthService: HealthService,
        private userService: UsersService
    ) { }

    @Get("physical/:id")
    async getPhysicalHealth(@Param('id') user_id: string): Promise<PhysicalHealth> {
        let user = await this.userService.getUserByID(user_id);

        if (!user) {
            throw new NotFoundException("User not found")
        }

        return this.healthService.getPhysicalHealth(user)
    }

    @Put("physical/:id")
    async updatePhysicalHealth(
        @Param('id') user_id: string,
        @Body() physicalDto: PhysicalHealthDto): Promise<PhysicalHealth> {
        let user = await this.userService.getUserByID(user_id);

        if (!user) {
            throw new NotFoundException("User not found")
        }

        return this.healthService.updatePhysicalHealth(user, physicalDto)
    }
}