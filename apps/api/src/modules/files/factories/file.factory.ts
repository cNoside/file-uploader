import { File as FileEntity } from '@prisma/client';

import { FileModel } from '../models/file.model';

export class FileFactory {
  public static entityToModel(entity: FileEntity): FileModel {
    return FileModel.create(entity);
  }

  public static modelToEntity(model: FileModel): FileEntity {
    return {
      id: model.id.value,
      key: model.key,
      filename: model.filename.value,
      contentType: model.contentType,
      contentLength: model.contentLength.value,
      ownerId: model.ownerId
    };
  }
}
