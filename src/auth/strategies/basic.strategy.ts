import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { BasicStrategy as Strategy } from 'passport-http';
import * as process from 'process';

@Injectable()
export class BasicStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super();
  }

  public validate = async (username: string, password: string): Promise<boolean> => {
    if (process.env.BASICUSERNAME === username && process.env.PASSWORD === password) {
      return true;
    }

    throw new UnauthorizedException();
  };
}
