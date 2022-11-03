import { Injectable } from '@nestjs/common';
import { File as IFileEntity } from '@prisma/client';

import { Mapper } from 'shared/base';
import { IFileDTO } from '../dto/file.dto';
import { FileModel } from '../models/file.model';

@Injectable()
export class FileMapper extends Mapper<FileModel, IFileEntity, IFileDTO> {
  public toEntity(model: FileModel): IFileEntity {
    return {
      id: model.id?.value,
      key: model.key,
      ownerId: model.ownerId,
      filename: model.filename.value,
      contentType: model.contentType,
      contentLength: model.contentLength.value
    };
  }

  public toDTO(model: FileModel): IFileDTO {
    return {
      id: model.id.value,
      ownerId: model.ownerId,
      filename: model.filename.value,
      extension: model.filename.extension,
      contentType: model.contentType,
      contentLength: model.contentLength.value,
      url: `${process.env.API_URL}/files/${model.id.value}/download`
    };
  }

  public toModel(entity: IFileEntity): FileModel {
    return FileModel.create(
      {
        ownerId: entity.ownerId,
        key: entity.key,
        filename: entity.filename,
        contentType: entity.contentType,
        contentLength: entity.contentLength
      },
      entity.id
    );
  }
}
