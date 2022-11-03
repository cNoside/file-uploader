import { Module } from '@nestjs/common';
import { FileService } from './files.service';
import { FilesController } from './files.controller';
import { StorageModule } from '../storage/storage.module';

@Module({
  controllers: [FilesController],
  providers: [FileService],
  imports: [StorageModule]
})
export class FilesModule {}
