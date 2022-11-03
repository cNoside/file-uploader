import { Injectable } from '@nestjs/common';

import { PrismaService } from 'modules/prisma';
import { FileModel } from './models/file.model';
import { FileMapper } from './mappers/file.mapper';
import { IRepository } from 'shared/base/repository.base';

export interface IFileRepository extends IRepository<FileModel> {
  findAll(): Promise<FileModel[]>;
  findAllByOwnerId(ownerId: number): Promise<FileModel[]>;
  findById(id: number): Promise<FileModel>;
  findByKey(key: string): Promise<FileModel>;
}

@Injectable()
export class FileRepository implements IFileRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly fileMapper: FileMapper
  ) {}

  public async findAll(): Promise<FileModel[]> {
    const files = await this.prisma.file.findMany();
    return files.map(this.fileMapper.toModel);
  }

  public async findAllByOwnerId(ownerId: number): Promise<FileModel[]> {
    const files = await this.prisma.file.findMany({
      where: {
        ownerId
      }
    });
    return files.map(this.fileMapper.toModel);
  }

  public async findById(id: number): Promise<FileModel> {
    const file = await this.prisma.file.findUnique({
      where: {
        id
      }
    });
    return file ? this.fileMapper.toModel(file) : null;
  }

  public async findByKey(key: string): Promise<FileModel> {
    const file = await this.prisma.file.findUnique({
      where: {
        key
      }
    });
    return file ? this.fileMapper.toModel(file) : null;
  }

  public async delete(model: FileModel): Promise<boolean> {
    try {
      const file = await this.prisma.file.findUnique({
        where: {
          id: model.id.value
        }
      });
      if (!file) {
        return false;
      }
      await this.prisma.file.delete({
        where: {
          id: model.id.value
        }
      });
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  public async save(model: FileModel): Promise<false | FileModel> {
    try {
      const file = this.fileMapper.toEntity(model);

      const updatedFile = await this.prisma.file.upsert({
        where: {
          id: file.key ? undefined : file.id ? file.id : undefined,
          key: file.key ? file.key : undefined
        },
        update: file,
        create: file
      });

      return this.fileMapper.toModel(updatedFile);
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
