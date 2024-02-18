import { ConfigService } from '@nestjs/config';
import { UserRepository } from './../../repositories/user/user.repository.service';
import { Injectable } from '@nestjs/common';
import { compareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.userRepository.findUserWithUserName(username);
    if (user && compareSync(password, user.password)) {
      delete user.password;
      return user;
    }
    return null;
  }

  async login(user: User) {
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
