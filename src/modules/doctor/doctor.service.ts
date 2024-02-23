import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { MyLogger } from '../../common/services/logger/logger.service';
import { CloudinaryService } from '../../common/services/upload-cloud/cloudinary.service';
import { DoctorRepository } from '../../repositories/doctor/doctor.repository.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { IDoctorCreate, IDoctorInfo, IDoctorUpdate } from './entities/doctor.entity';

@Injectable()
export class DoctorService {
  constructor(
    private readonly doctorRepository: DoctorRepository,
    private readonly logger: MyLogger,
    private readonly cloudinaryService: CloudinaryService,
  ) {}
  async create(createDoctorDto: CreateDoctorDto, image: Express.Multer.File) {
    try {
      const avatar = await this.cloudinaryService.uploadImage(image);
      const publicId = avatar.public_id;
      try {
        const doctorCreateParams: IDoctorCreate = {
          ...createDoctorDto,
          image: avatar.url,
          password: bcrypt.hashSync(createDoctorDto.password, 10),
        };
        const result = await this.doctorRepository.create(doctorCreateParams);
        if (result.rowCount <= 0) {
          this.logger.error(`Create Doctor ${createDoctorDto.username} failed`);
          throw new BadRequestException(`Create Doctor ${createDoctorDto.username} failed`);
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

  async findAll() {
    try {
      const doctors: IDoctorInfo[] = await this.doctorRepository.findAll();
      return doctors;
    } catch (error) {
      this.logger.error(`Get List Doctors Failed`);
      throw error;
    }
  }

  async findOne(username: string) {
    const doctorInfo: IDoctorInfo = await this.doctorRepository.find(username);
    if (!doctorInfo) {
      this.logger.error(`Doctor ${username} not found`);
      throw new NotFoundException(`Doctor ${username} not found`);
    }
    return doctorInfo;
  }

  async update(updateDoctorDto: UpdateDoctorDto, image: Express.Multer.File) {
    try {
      const oldDoctor = await this.doctorRepository.find(updateDoctorDto.username);
      if (!oldDoctor) {
        throw new NotFoundException(`Doctor ${updateDoctorDto.username} Not Exits!`);
      }
      const parts = oldDoctor.image.split('/');
      const lastPart = parts[parts.length - 1];
      const publicIdOld = `user/${lastPart.split('.')[0]}`;

      const avatar = await this.cloudinaryService.uploadImage(image);
      const publicId = avatar.public_id;
      try {
        const doctorUpdateParams: IDoctorUpdate = {
          ...updateDoctorDto,
          image: avatar.url,
        };
        const result = await this.doctorRepository.update(doctorUpdateParams);
        if (result.rowCount <= 0) {
          this.logger.error(`Update Doctor ${updateDoctorDto.username} failed`);
          throw new BadRequestException(`Update Doctor ${updateDoctorDto.username} failed`);
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
}
