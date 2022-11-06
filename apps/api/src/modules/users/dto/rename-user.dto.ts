import { PickType } from '@nestjs/mapped-types';

import { CreateUserDTO } from './create-user.dto';

export class RenameUserDTO extends PickType(CreateUserDTO, ['username']) {}
