import { AuthGuard, PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../../users/repositories/user.repository';
import { Request } from 'express';
import { User } from 'modules/users/models';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepo: UserRepository
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET
    });
  }

  async validate(payload: any) {
    const user = await this.userRepo.findOneById(payload.sub);
    return user;
  }
}

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}

export interface DeserializedUserExpressRequest extends Request {
  user: User;
}
