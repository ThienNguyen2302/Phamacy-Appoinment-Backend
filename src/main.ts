import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { MyLogger } from './common/services/logger/logger.service';
import { ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { TransformInterceptor } from './core/transform.interceptor';
import { GlobalErrorFilter } from './core/globalError.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const logger = new MyLogger('main.ts');
  const configService = app.get(ConfigService);
  const POST = Number(configService.get('POST'));
  const reflector = app.get(Reflector);

  // setting cors
  app.enableCors({
    origin: true,
    methods: ['GET', 'PUT', 'PATCH', 'POST', 'DELETE'],
    credentials: true,
  });

  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(new GlobalErrorFilter<Error>(new MyLogger('GlobalErrorFilter')));

  app.useGlobalGuards(new JwtAuthGuard(reflector));
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Loại bỏ các thuộc tính không được định nghĩa trong DTO
      forbidNonWhitelisted: true, // Tự động từ chối bất kỳ thuộc tính không được định nghĩa trong DTO
      transform: true, // Chuyển đổi các giá trị được nhận vào kiểu của thuộc tính trong DTO
    }),
  );
  await app.listen(POST || 5000);
  logger.verbose(`Listening on ${POST || 5000}`);
}
bootstrap();
