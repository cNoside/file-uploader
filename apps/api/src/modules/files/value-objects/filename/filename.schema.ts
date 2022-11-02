import { z } from 'zod';

export const filenameSchema = z.string().min(1).max(255);
