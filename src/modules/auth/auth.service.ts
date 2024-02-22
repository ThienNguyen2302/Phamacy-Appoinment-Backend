import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';
import { IUserBaseInfo } from '../user/entities/user.entity';
import { UserRepository } from './../../repositories/user/user.repository.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateUser(username: string, password: string) {
    const user: IUserBaseInfo = await this.userRepository.findUserWithUserName(username);
    if (user && compareSync(password, user.password)) {
      delete user.password;
      return user;
    }
    return null;
  }

  async login(user: IUserBaseInfo) {
    const payload = user;
    return {
      accessToken: this.jwtService.sign(payload),
      refreshToken: this.createRefreshToken(payload),
      userInfo: payload,
    };
  }

  createRefreshToken(payload) {
    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn: this.configService.get<string>('JWT_REFRESH_TOKEN_EXPIRE'),
    });
    return refreshToken;
  }
}
