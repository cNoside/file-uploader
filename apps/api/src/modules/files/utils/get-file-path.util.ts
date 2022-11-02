import { FileModel } from '../models/file.model';

export const getFilePath = (file: FileModel): string =>
  `${process.env.STORAGE_PATH}/${file.key}.${file.filename.extension}`;
