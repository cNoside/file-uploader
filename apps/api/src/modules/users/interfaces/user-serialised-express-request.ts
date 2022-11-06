import { Request } from 'express';
import { User } from '../models';

export interface UserSerialisedExpressRequest extends Request {
  user: User;
}
