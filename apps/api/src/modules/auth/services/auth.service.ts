import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../users/models/user.model';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  public async createJWT(user: User): Promise<string> {
    return this.jwtService.sign({
      sub: user.id
    });
  }
}
