import * as path from 'path';

import { FileModel } from '../models/file.model';

export const getFilePath = (file: FileModel): string =>
  path.resolve(
    `${process.env.STORAGE_PATH}/${file.key}.${file.filename.extension}`
  );
