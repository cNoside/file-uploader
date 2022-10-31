import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UploadsModule } from './domains/uploads/uploads.module';
import { UsersModule } from './domains/users/users.module';
import { FilesModule } from './domains/files/files.module';
import { FoldersModule } from './domains/folders/folders.module';
import { PrismaModule } from 'modules/prisma';

@Module({
  imports: [
    UploadsModule,
    UsersModule,
    FilesModule,
    FoldersModule,
    PrismaModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
