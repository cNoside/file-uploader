import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { FilesModule } from './modules/files/files.module';
import { FoldersModule } from './modules/folders/folders.module';
import { PrismaModule } from 'modules/prisma';

@Module({
  imports: [UsersModule, FilesModule, FoldersModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
