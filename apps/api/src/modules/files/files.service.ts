import { Inject, Injectable } from '@nestjs/common';
import { UploadFileDTO } from './dto/upload-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { FileFactory } from './factories/file.factory';
import { FileModel } from './models/file.model';
import { v4 as uuidv4 } from 'uuid';
import { promises as fs } from 'fs';
import * as mime from 'mime-types';
import { getFilePath } from './utils';
import { FileRepository } from './file.repository';
import { FSFileStorageService } from '../storage/fs-file-storage.service';
import { FileStorage } from 'modules/storage/decorators/file-storage.decorator';
import { IFileStorageService } from 'modules/storage/models/file-storage-service.model';
import { FileMapper } from './mappers/file.mapper';
import { getContentTypeFromFilename } from './utils/get-content-type-from-filename.util';
import { FILE_STORAGE_SERVICE_TOKEN } from '../storage/constants/tokens.constant';

// TODO: abstract lower level CRUD operations into a generic repository
// TODO: only leave domain specific operations in this service, e.g. findByOwnerId, rename, etc.

interface IFileService {
  findAll(): Promise<FileModel[]>;
  findAllByOwnerId(ownerId: number): Promise<FileModel[]>;
  findById(id: number): Promise<FileModel>;
  findByKey(key: string): Promise<FileModel>;
  getBuffer(key: string): Promise<Buffer>;
  upload(dto: UpdateFileDto, buffer: Buffer): Promise<FileModel>;
  delete(id: number): Promise<boolean>;
  rename(id: number, filename: string): Promise<boolean>;
  changeOwner(id: number, ownerId: number): Promise<boolean>;
}

@Injectable()
export class FileService implements IFileService {
  constructor(
    private readonly fileMapper: FileMapper,
    private readonly fileRepository: FileRepository,
    @FileStorage()
    private readonly fileStorageService: IFileStorageService
  ) {}

  public async findAll(): Promise<FileModel[]> {
    const files = await this.fileRepository.findAll();
    return files;
  }

  public async findAllByOwnerId(ownerId: number): Promise<FileModel[]> {
    const files = await this.fileRepository.findAllByOwnerId(ownerId);
    return files;
  }

  public async findById(id: number): Promise<FileModel> {
    const file = await this.fileRepository.findById(id);
    return file;
  }

  public async findByKey(key: string): Promise<FileModel> {
    const file = await this.fileRepository.findByKey(key);
    return file;
  }

  public async getBuffer(key: string) {
    const { buffer } = await this.fileStorageService.findFile(key);
    return buffer;
  }

  public async upload(dto: UploadFileDTO, buffer: Buffer): Promise<FileModel> {
    const ownerId = dto.userId;
    const filename = dto.filename;
    const contentType = getContentTypeFromFilename(filename);
    const contentLength = buffer.byteLength;
    const key = await this.fileStorageService.saveFile(buffer);
    const file = FileModel.create({
      ownerId,
      filename,
      contentType,
      contentLength,
      key
    });
    const savedFile = await this.fileRepository.save(file);
    if (!savedFile) {
      throw new Error('Failed to save file');
    }
    return savedFile;
  }

  public async delete(id: number): Promise<boolean> {
    const file = await this.fileRepository.findById(id);
    if (!file) {
      return false;
    }
    const isSuccess = await this.fileRepository.delete(file);
    if (!isSuccess) {
      return false;
    }
    return this.fileStorageService.deleteFile(file.key);
  }

  public async rename(id: number, filename: string): Promise<boolean> {
    const file = await this.fileRepository.findById(id);
    if (!file) {
      return false;
    }
    file.rename(filename);
    return !!this.fileRepository.save(file);
  }

  public async changeOwner(id: number, ownerId: number): Promise<boolean> {
    const file = await this.fileRepository.findById(id);
    if (!file) {
      return false;
    }
    file.changeOwner(ownerId);
    return !!(await this.fileRepository.save(file));
  }
}
