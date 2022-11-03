import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { promises as fs } from 'fs';

import { IFileStorageService, IFile } from './storage.service';

export class FSFileStorageService implements IFileStorageService {
  public async findFile(key: string): Promise<IFile> {
    try {
      const filePath = path.join(process.env.FS_FILE_STORAGE_DIR, key);
      const buffer = await fs.readFile(filePath);
      return {
        key,
        buffer
      };
    } catch {
      return null;
    }
  }

  public async saveFile(buffer: Buffer): Promise<string> {
    const key = uuidv4();
    await fs.mkdir(process.env.FS_FILE_STORAGE_DIR, { recursive: true });
    await fs.writeFile(path.join(process.env.FS_FILE_STORAGE_DIR, key), buffer);
    return key;
  }

  public async deleteFile(key: string): Promise<boolean> {
    try {
      const filePath = path.join(process.env.FS_FILE_STORAGE_DIR, key);
      await fs.unlink(filePath);
      return true;
    } catch {
      return false;
    }
  }
}

export class S3StorageService implements IFileStorageService {
  public async findFile(key: string): Promise<IFile> {
    return null;
  }

  public async saveFile(buffer: Buffer): Promise<string> {
    return null;
  }

  public async deleteFile(key: string): Promise<boolean> {
    return true;
  }
}
