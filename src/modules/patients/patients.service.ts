import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { MyLogger } from '../../common/services/logger/logger.service';
import { CloudinaryService } from '../../common/services/upload-cloud/cloudinary.service';
import { PatientsRepository } from '../../repositories/patients/patients.repository.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { patient } from './entities/patient.entity';

@Injectable()
export class PatientsService {
  constructor(
    private readonly patientsRepository: PatientsRepository,
    private readonly logger: MyLogger,
    private readonly cloudinaryService: CloudinaryService,
  ) {}
  async create(createPatientDto: CreatePatientDto, image: Express.Multer.File) {
    // upload avatar
    try {
      const avatar = await this.cloudinaryService.uploadImage(image);
      const publicId = avatar.public_id;
      try {
        const patient: patient = {
          ...createPatientDto,
          image: avatar.url,
          password: bcrypt.hashSync(createPatientDto.password, 10),
        };
        const result = await this.patientsRepository.create(patient);
        if (result.rowCount <= 0) {
          this.logger.error(`Create Patient ${createPatientDto.username} failed`);
          throw new BadRequestException(`Create Patient ${createPatientDto.username} failed`);
        }
        return result;
      } catch (error) {
        await this.cloudinaryService.removeImageFromCloudinary(publicId);
        throw error;
      }
    } catch (error) {
      throw new BadRequestException(error?.message);
    }
  }

  findAll() {
    return `This action returns all patients`;
  }
}
