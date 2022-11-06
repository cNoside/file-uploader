import { z } from 'zod';

import { Role } from './role.enum';

export const roleSchema = z.enum([Role.ADMIN, Role.USER]);
