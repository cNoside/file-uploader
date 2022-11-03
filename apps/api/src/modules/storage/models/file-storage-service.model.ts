import { IFile } from './file.model';

export interface IFileStorageService {
  findFile(key: string): Promise<IFile>;
  saveFile(buffer: Buffer): Promise<string>;
  deleteFile(key: string): Promise<boolean>;
}
