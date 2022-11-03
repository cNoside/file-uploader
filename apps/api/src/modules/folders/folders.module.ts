import { Module } from '@nestjs/common';
import { FoldersService } from './folders.service';
import { FoldersController } from './folders.controller';
import { StorageModule } from 'modules/storage/storage.module';
import { FSFileStorageService } from 'modules/storage/fs-file-storage.service';

@Module({
  imports: [],
  controllers: [FoldersController],
  providers: [FoldersService]
})
export class FoldersModule {}
