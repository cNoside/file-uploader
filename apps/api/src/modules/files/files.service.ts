import { Injectable } from '@nestjs/common';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { FileFactory } from './factories/file.factory';
import { FileModel } from './models/file.model';
import { v4 as uuidv4 } from 'uuid';
import { promises as fs } from 'fs';
import * as mime from 'mime-types';
import { getFilePath } from './utils';
import { FileRepository } from './file.repository';
import { FSFileStorageService } from '../storage/fs-storage.service';

// TODO: abstract lower level CRUD operations into a generic repository
// TODO: only leave domain specific operations in this service, e.g. findByOwnerId, rename, etc.

interface IFileService {}

@Injectable()
export class FileService implements IFileService {
  constructor(private readonly fileRepository: FileRepository, fileStorageService: FSFileStorageService) {}

  async findAll(): Promise<FileModel[]> {
    const files = await this.fileRepository.findAll();
    return files;
  }

  async findAllByOwnerId(ownerId: number): Promise<FileModel[]> {
    const files = await this.fileRepository.findAllByOwnerId(ownerId);
    return files;
  }

  async findById(id: number): Promise<FileModel> {
    const file = await this.fileRepository.findById(id);
    return file;
  }

  async findByKey(key: string): Promise<FileModel> {
    const file = await this.fileRepository.findByKey(key);
    return file;
  }

  async create(dto: CreateFileDto, data: Buffer): Promise<FileModel> {
    const key = uuidv4();

    const { userId, filename } = dto;
    const extension = filename.split('.').pop();

    const fileEntity = await this.prisma.file.create({
      data: {
        ownerId: userId,
        key,
        filename,
        contentType: mime.contentType(filename) || 'application/octet-stream',
        contentLength: data.byteLength
      }
    });
    // await fs.writeFile(`${process.env.STORAGE_PATH}/${key}.${extension}`, data);

    return FileFactory.entityToModel(fileEntity);
  }

  async update(id: number, updateFileDto: UpdateFileDto): Promise<boolean> {
    const { filename, userId } = updateFileDto;
    console.log(updateFileDto);

    const file = await this.prisma.file.findUnique({
      where: {
        id
      }
    });
    if (!file) {
      return false;
    }
    await this.prisma.file.update({
      where: {
        id: file.id
      },
      data: {
        filename,
        ownerId: userId
      }
    });
    return true;
  }

  async remove(id: number): Promise<boolean> {
    const file = await this.prisma.file.findUnique({
      where: {
        id
      }
    });
    if (!file) {
      return false;
    }
    await this.prisma.file.delete({
      where: {
        id
      }
    });
    const fileModel = FileFactory.entityToModel(file);
    const path = getFilePath(fileModel);
    await fs.unlink(path);
    return true;
  }
}
