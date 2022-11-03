import { Inject } from '@nestjs/common';
import { FILE_STORAGE_SERVICE_TOKEN } from '../constants/tokens.constant';

export const FileStorage = () => Inject(FILE_STORAGE_SERVICE_TOKEN);
