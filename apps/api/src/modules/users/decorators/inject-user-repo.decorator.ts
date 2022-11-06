import { Inject } from '@nestjs/common';

import { USER_REPOSITORY } from 'modules/users';

export const InjectUserRepo = () => Inject(USER_REPOSITORY);
