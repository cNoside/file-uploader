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
  Res
} from '@nestjs/common';
import { FilesService } from './files.service';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { FileMap } from './mappers/file.mapper';
import { FileInterceptor } from '@nestjs/platform-express';
import { getFilePath } from './utils';
import { FileFactory } from './factories/file.factory';
import * as send from 'send';
import { Request, Response } from 'express';
import * as pathModule from 'path';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Get()
  async findAll() {
    const files = await this.filesService.findAll();
    const DTOs = files.map(FileMap.toDTO);
    return {
      status: 'success',
      data: {
        files: DTOs
      }
    };
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const file = await this.filesService.findOne(id);
    if (!file) {
      throw new NotFoundException();
    }
    const DTO = FileMap.toDTO(file);
    return {
      status: 'success',
      data: {
        file: DTO
      }
    };
  }

  // implement rbac
  @Get(':id/view')
  async viewRedirect(
    @Param('id', ParseIntPipe) id: number,
    @Res() res: Response
  ) {
    const file = await this.filesService.findOne(id);
    if (!file) {
      throw new NotFoundException();
    }
    return res.redirect(`/files/${file.id.value}/${file.filename.value}`);
  }

  @Get(':id/download')
  async downloadRedirect(
    @Param('id', ParseIntPipe) id: number,
    @Res() res: Response
  ) {
    const file = await this.filesService.findOne(id);
    if (!file) {
      throw new NotFoundException();
    }
    return res.redirect(
      `/files/${file.id.value}/${file.filename.value}/download`
    );
  }

  @Get(':id/:filename')
  async view(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
    const file = await this.filesService.findOne(id);
    if (!file) {
      throw new NotFoundException();
    }
    const path = getFilePath(file);
    return res.sendFile(path);
  }

  @Get(':id/:filename/download')
  async download(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
    const file = await this.filesService.findOne(id);
    if (!file) {
      throw new NotFoundException();
    }

    const path = getFilePath(file);
    return res.download(path, file.filename.value);
  }

  @Post('/users/:userId')
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Param('userId', ParseIntPipe) userId: number
  ) {
    const createdFile = await this.filesService.create(
      { userId, filename: file.originalname },
      file.buffer
    );
    const DTO = FileMap.toDTO(createdFile);
    return {
      status: 'success',
      data: {
        file: DTO
      }
    };
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateFileDto: UpdateFileDto
  ) {
    const isSuccess = await this.filesService.update(id, updateFileDto);
    if (!isSuccess) {
      throw new NotFoundException();
    }
    return {
      status: 'success',
      data: {
        message: 'File updated'
      }
    };
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const isSuccess = await this.filesService.remove(id);
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
