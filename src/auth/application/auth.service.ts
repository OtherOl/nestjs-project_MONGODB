import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ObjectId } from 'mongodb';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async createPasswordHash(password: string) {
    return await bcrypt.hash(password, 10);
  }

  async createAccessToken(userId: ObjectId) {
    return this.jwtService.sign({ userId: userId }, { expiresIn: '10s' });
  }

  async createRefreshToken(userId: ObjectId) {
    return this.jwtService.sign({ userId: userId, deviceId: uuidv4() }, { expiresIn: '20s' });
  }

  async createNewRefreshToken(userId: ObjectId, deviceId: string) {
    return this.jwtService.sign({ userId: userId, deviceId: deviceId }, { expiresIn: '20s' });
  }

  async verifyToken(token: string) {
    if (!token) throw new UnauthorizedException();
    return this.jwtService.verify(token);
  }

  async getUserIdByToken(token: string | undefined) {
    if (!token) throw new UnauthorizedException();
    try {
      const user = await this.jwtService.verify(token);
      return user.userId;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  async getUserIdForGet(token: string | undefined) {
    if (!token) return 'fffff3ea02afffffc87fffff';
    try {
      const user = await this.jwtService.verify(token);
      return user.userId;
    } catch (error) {
      return 'fffff3ea02afffffc87fffff';
    }
  }

  async decodeRefreshToken(token: string | undefined) {
    if (!token) throw new UnauthorizedException();
    const decodedToken = await this.jwtService.decode(token);
    return decodedToken.deviceId;
  }
}
