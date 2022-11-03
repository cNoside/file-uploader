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
    const entities = await this.prisma.file.findMany();
    return entities.map(this.fileMapper.toModel);
  }

  public async findAllByOwnerId(ownerId: number): Promise<FileModel[]> {
    const entities = await this.prisma.file.findMany({
      where: {
        ownerId
      }
    });
    return entities.map(this.fileMapper.toModel);
  }

  public async findById(id: number): Promise<FileModel> {
    const entity = await this.prisma.file.findUnique({
      where: {
        id
      }
    });
    return this.fileMapper.toModel(entity);
  }

  public async findByKey(key: string): Promise<FileModel> {
    const entity = await this.prisma.file.findUnique({
      where: {
        key
      }
    });
    return this.fileMapper.toModel(entity);
  }

  public async delete(model: FileModel): Promise<boolean> {
    try {
      const entity = await this.prisma.file.findUnique({
        where: {
          id: model.id.value
        }
      });
      if (!entity) {
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

  public async save(model: FileModel): Promise<boolean> {
    try {
      const { id, ...entity } = this.fileMapper.toEntity(model);

      await this.prisma.file.upsert({
        where: {
          id: id
        },
        update: entity,
        create: entity
      });

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
