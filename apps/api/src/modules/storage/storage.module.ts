import { Module } from '@nestjs/common';
import { FSFileStorageService } from './fs-storage.service';

@Module({})
export class StorageModule {
  public static register() {
    return {
      module: StorageModule,
      exports: [FSFileStorageService]
    };
  }
}
