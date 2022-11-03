import { DynamicModule, Module, Provider } from '@nestjs/common';
import { FSFileStorageService } from './fs-file-storage.service';
import { IFileStorageService } from './models/file-storage-service.model';
import { ModuleMetadata, FactoryProvider } from '@nestjs/common';
import { FILE_STORAGE_SERVICE_TOKEN } from './constants/tokens.constant';
import { InjectionToken, OptionalFactoryDependency } from '@nestjs/common';

export interface StorageModuleAsyncOptions
  extends Pick<FactoryProvider, 'inject'> {
  useFactory: (fileStorageService: IFileStorageService) => IFileStorageService;
}

@Module({})
export class StorageModule {
  public static forRoot(options: StorageModuleAsyncOptions): DynamicModule {
    const { inject, useFactory } = options;

    const FileStorageServiceProvider: Provider<IFileStorageService> = {
      provide: FILE_STORAGE_SERVICE_TOKEN,
      useFactory: useFactory,
      inject: inject
    };

    return {
      module: StorageModule,
      providers: [FileStorageServiceProvider],
      exports: [FileStorageServiceProvider],
      global: true
    };
  }
}
