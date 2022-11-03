import { Response } from 'express';

export interface IFile {
  key: string;
  buffer: Buffer;
}

export interface IFileStorageService {
  findFile(key: string): Promise<IFile>;
  saveFile(buffer: Buffer): Promise<string>;
  deleteFile(key: string): Promise<boolean>;
}
