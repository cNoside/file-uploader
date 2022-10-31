import { Injectable } from '@nestjs/common';
import { CreateUploadDto } from './dto/create-upload.dto';
import { UpdateUploadDto } from './dto/update-upload.dto';
import { PrismaService } from '../../modules/prisma/prisma.service';

import { promises as fs } from 'fs';

@Injectable()
export class UploadsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUploadDto: CreateUploadDto): Promise<boolean> {
    const { name, size, buffer } = createUploadDto;

    await fs.mkdir('uploads', { recursive: true });
    await fs.writeFile(`uploads/${name}`, buffer);

    await this.prisma.upload.create({
      data: {
        name: name,
        size: size,
        url: `uploads/${name}`
      }
    });
    return true;
  }

  findAll() {
    return this.prisma.upload.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} upload`;
  }

  update(id: number, updateUploadDto: UpdateUploadDto) {
    return `This action updates a #${id} upload`;
  }

  remove(id: number) {
    return `This action removes a #${id} upload`;
  }
}
