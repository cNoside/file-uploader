import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  NotFoundException,
  UseInterceptors,
  UploadedFile,
  Req,
  Res,
  BadRequestException
} from '@nestjs/common';
import { FileService } from './files.service';
import { UploadFileDTO } from './dto/upload-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { FileMapper } from './mappers/file.mapper';
import { FileInterceptor } from '@nestjs/platform-express';
import { getFilePath } from './utils';
import { FileFactory } from './factories/file.factory';
import * as send from 'send';
import { Request, Response } from 'express';
import * as pathModule from 'path';
import { FileStorage } from 'modules/storage/decorators/file-storage.decorator';
import { IFileStorageService } from 'modules/storage/models/file-storage-service.model';
import stream from 'stream';
import { RenameFileDto } from './dto/rename-file.dto';

@Controller('files')
export class FilesController {
  constructor(
    private readonly fileService: FileService,
    private readonly fileMapper: FileMapper
  ) {}

  @Get()
  async findAll() {
    const files = await this.fileService.findAll();
    const filesDTO = files.map(this.fileMapper.toDTO);
    return {
      status: 'success',
      data: {
        files: filesDTO
      }
    };
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const file = await this.fileService.findById(id);
    if (!file) {
      throw new NotFoundException();
    }
    const DTO = this.fileMapper.toDTO(file);
    return {
      status: 'success',
      data: {
        file: DTO
      }
    };
  }

  @Get(':id/download')
  async download(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
    const file = await this.fileService.findById(id);
    if (!file) {
      throw new NotFoundException();
    }

    const buffer = await this.fileService.getBuffer(file.key);
    res.setHeader(
      'Content-disposition',
      `attachment; filename=${file.filename.value}`
    );
    res.setHeader('Content-type', file.contentType);
    return res.send(buffer);
  }

  @Post('/users/:userId')
  @UseInterceptors(FileInterceptor('file'))
  async uploadToUser(
    @UploadedFile() file: Express.Multer.File,
    @Param('userId', ParseIntPipe) userId: number
  ) {
    const uploadedFile = await this.fileService.upload(
      { userId, filename: file.originalname },
      file.buffer
    );
    const DTO = this.fileMapper.toDTO(uploadedFile);
    return {
      status: 'success',
      data: {
        file: DTO
      }
    };
  }

  @Post(':id/rename')
  async rename(
    @Param('id', ParseIntPipe) id: number,
    @Body() renameFileDTO: RenameFileDto
  ) {
    const file = await this.fileService.findById(id);
    if (!file) {
      throw new NotFoundException();
    }
    const isSuccess = await this.fileService.rename(
      file.id.value,
      renameFileDTO.filename
    );
    if (!isSuccess) {
      throw new BadRequestException();
    }
    return {
      status: 'success',
      data: {
        message: 'File renamed successfully'
      }
    };
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const isSuccess = await this.fileService.delete(id);
    if (!isSuccess) {
      throw new NotFoundException();
    }
    return {
      status: 'success',
      data: {
        message: 'File deleted'
      }
    };
  }
}
