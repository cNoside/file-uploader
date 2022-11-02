import { FileDTO } from '../dto/file.dto';
import { FileModel } from '../models/file.model';

export class FileMap {
  public static toDTO(file: FileModel): FileDTO {
    return {
      id: file.id.value,
      ownerId: file.ownerId,
      filename: file.filename.value,
      extension: file.filename.extension,
      contentType: file.contentType,
      contentLength: file.contentLength.value,
      url: `${process.env.API_URL}${process.env.FILES_STATIC_PATH}/${file.key}.${file.filename.extension}`
    };
  }
}
