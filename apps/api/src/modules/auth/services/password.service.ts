import { Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';
import { IPasswordService } from '../models/password-service.model';

@Injectable()
export class Argon2PasswordService implements IPasswordService {
  public async hash(password: string): Promise<string> {
    return argon2.hash(password);
  }

  public async compare(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    return argon2.verify(hashedPassword, password);
  }
}
