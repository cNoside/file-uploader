import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { FilesModule } from './modules/files/files.module';
import { FoldersModule } from './modules/folders/folders.module';
import { PrismaModule } from 'modules/prisma';
import { StorageModule } from 'modules/storage/storage.module';
import { FSFileStorageService } from './modules/storage/fs-file-storage.service';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    UsersModule,
    StorageModule.forRoot({
      useFactory: () => {
        return new FSFileStorageService();
      }
    }),
    FilesModule,
    FoldersModule,
    PrismaModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
