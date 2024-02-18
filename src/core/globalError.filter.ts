// global-error.filter.ts
import { Catch, ArgumentsHost, ExceptionFilter, HttpException } from '@nestjs/common';
import { MyLogger } from 'src/common/services/logger/logger.service';

@Catch()
export class GlobalErrorFilter<T extends Error> implements ExceptionFilter {
  constructor(private readonly logger: MyLogger) {}
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status = exception instanceof HttpException ? exception.getStatus() : 500;

    this.logger.error(`[${request.method}] ${request.url}`);

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: exception.message || 'Internal server error',
    });
  }
}
