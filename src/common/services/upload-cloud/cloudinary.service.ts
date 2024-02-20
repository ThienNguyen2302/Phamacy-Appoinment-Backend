import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MyLogger } from '../logger/logger.service';
import toStream = require('buffer-to-stream');

import { UploadApiErrorResponse, UploadApiResponse, v2 as cloudinary } from 'cloudinary';

@Injectable()
export class CloudinaryService {
  constructor(
    private readonly logger: MyLogger,
    private configService: ConfigService,
  ) {
    cloudinary.config({
      cloud_name: this.configService.get<string>('CLOUD_NAME'),
      api_key: this.configService.get<string>('API_KEY'),
      api_secret: this.configService.get<string>('API_SECRET'),
    });
  }

  async uploadImage(file: Express.Multer.File): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      const upload = cloudinary.uploader.upload_stream({ folder: 'user', resource_type: 'image' }, (error, result) => {
        if (error) return reject(error);
        resolve(result);
      });

      toStream(file.buffer).pipe(upload);
    });
  }

  async removeImageFromCloudinary(publicId: string) {
    try {
      const result = await cloudinary.uploader.destroy(publicId);
      return result;
    } catch (error) {
      throw error;
    }
  }
}
