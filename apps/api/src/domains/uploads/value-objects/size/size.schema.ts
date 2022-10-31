import { z } from 'zod';

export const sizeSchema = z.number().int().positive();
