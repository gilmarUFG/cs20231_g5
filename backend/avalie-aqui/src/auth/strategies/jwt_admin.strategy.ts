import { jwtConstants } from '../constants';
import { JwtUserPayload } from '../auth.types';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class JwtAdminStrategy extends PassportStrategy(Strategy, 'jwt_admin') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: JwtUserPayload) {
    throw new UnauthorizedException();
  }
}
