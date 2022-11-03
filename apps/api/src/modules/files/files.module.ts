import { Module } from '@nestjs/common';
import { FileService } from './files.service';
import { FilesController } from './files.controller';
import { StorageModule } from '../storage/storage.module';
import { FileMapper } from './mappers/file.mapper';
import { FileRepository } from './file.repository';

@Module({
  controllers: [FilesController],
  providers: [FileMapper, FileRepository, FileService]
})
export class FilesModule {}
