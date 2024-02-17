import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PhysicalHealth } from './entities/physical-health.entity';
import { PhysicalHealthDto } from './dto/physical-heal.dto';
import { Users } from 'src/users/users.entity';

@Injectable()
export class HealthService {

    constructor(
        @InjectRepository(PhysicalHealth)
        private readonly physicalHealthRepository: Repository<PhysicalHealth>,
    ) { }

    async getPhysicalHealth(user: Users): Promise<PhysicalHealth> {
        let health = await this.physicalHealthRepository.findOne({
            where: {
                user: user
            }
        });

        if (!health) {
            health = this.physicalHealthRepository.create({
                user: user
            })

            health = await this.physicalHealthRepository.save(health)
        }

        return health
    }

    // async create(physicalHealth: PhysicalHealth): Promise<PhysicalHealth> {
    //     return await this.physicalHealthRepository.save(physicalHealth);
    // }

    async updatePhysicalHealth(user: Users, physicalHealth: PhysicalHealthDto): Promise<PhysicalHealth> {
        const physicalHealthToUpdate = await this.getPhysicalHealth(user);
        physicalHealthToUpdate.height = physicalHealth.height;
        physicalHealthToUpdate.weight = physicalHealth.weight;
        physicalHealthToUpdate.pulse = physicalHealth.pulse;
        physicalHealthToUpdate.bloodPressure = physicalHealth.bloodPressure;
        return await this.physicalHealthRepository.save(physicalHealthToUpdate);
    }

    // async delete(id: string): Promise<void> {
    //     await this.physicalHealthRepository.delete(id);
    // }
}
