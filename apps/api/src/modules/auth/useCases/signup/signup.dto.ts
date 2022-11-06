import { OmitType } from '@nestjs/mapped-types';
import { CreateUserDTO } from '../../../users/dto/create-user.dto';

export class SignupDTO extends OmitType(CreateUserDTO, ['role']) {}
