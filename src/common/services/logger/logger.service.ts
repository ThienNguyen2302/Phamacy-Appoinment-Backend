import { LoggerService, Injectable, Logger } from '@nestjs/common';

@Injectable()
export class MyLogger extends Logger implements LoggerService {
  // Override phương thức log để tùy chỉnh định dạng
  log(message: string) {
    const formattedMessage = `[PhuDD][${new Date().toLocaleTimeString()}] ${message}`;
    super.log(formattedMessage);
  }

  error(message: string) {
    const formattedMessage = `[PhuDD][${new Date().toLocaleTimeString()}] ${message}`;
    super.error(formattedMessage);
  }

  warn(message: string) {
    const formattedMessage = `[PhuDD][${new Date().toLocaleTimeString()}] ${message}`;
    super.warn(formattedMessage);
  }

  verbose(message: string) {
    const formattedMessage = `[PhuDD][${new Date().toLocaleTimeString()}] ${message}`;
    super.verbose(formattedMessage);
  }
}
