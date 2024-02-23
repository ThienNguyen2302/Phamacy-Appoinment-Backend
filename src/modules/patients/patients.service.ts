import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { MyLogger } from '../../common/services/logger/logger.service';
import { CloudinaryService } from '../../common/services/upload-cloud/cloudinary.service';
import { PatientsRepository } from '../../repositories/patients/patients.repository.service';
import { UserRepository } from '../../repositories/user/user.repository.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { patient, patientInfo, patientUpdate } from './entities/patient.entity';

@Injectable()
export class PatientsService {
  constructor(
    private readonly patientsRepository: PatientsRepository,
    private readonly logger: MyLogger,
    private readonly cloudinaryService: CloudinaryService,
    private readonly userRepository: UserRepository,
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

  async update(updatePatientDto: UpdatePatientDto, image: Express.Multer.File) {
    // upload avatar
    try {
      const oldPatient = await this.patientsRepository.find(updatePatientDto.username);
      if (!oldPatient) {
        throw new NotFoundException(`Patient ${updatePatientDto.username} not exits!`);
      }

      const parts = oldPatient.image.split('/');
      const lastPart = parts[parts.length - 1];
      const publicIdOld = `user/${lastPart.split('.')[0]}`;

      const avatar = await this.cloudinaryService.uploadImage(image);
      const publicId = avatar.public_id;
      try {
        const patient: patientUpdate = {
          ...updatePatientDto,
          image: avatar.url,
        };
        const result = await this.patientsRepository.update(patient);
        if (result.rowCount <= 0) {
          this.logger.error(`Update Patient ${updatePatientDto.username} failed`);
          throw new BadRequestException(`Update Patient ${updatePatientDto.username} failed`);
        }

        await this.cloudinaryService.removeImageFromCloudinary(publicIdOld);
        return result;
      } catch (error) {
        await this.cloudinaryService.removeImageFromCloudinary(publicId);
        throw error;
      }
    } catch (error) {
      throw error;
    }
  }

  async find(username: string) {
    const patient: patientInfo = await this.patientsRepository.find(username);
    if (!patient) {
      this.logger.error(`Patient ${username} not found`);
      throw new NotFoundException(`Patient ${username} not found`);
    }
    return patient;
  }

  async findAll() {
    try {
      const patients: patientInfo[] = await this.patientsRepository.findAll();
      return patients;
    } catch (error) {
      this.logger.error(`Get List Patient Failed`);
      throw error;
    }
  }
}
