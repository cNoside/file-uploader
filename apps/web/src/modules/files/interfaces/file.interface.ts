import { IBaseModel } from 'shared/interfaces';
import { FileVisibiltiy } from 'modules/files';

export interface IFile extends IBaseModel {
  ownerId: number;
  filename: string;
  extension: string;
  contentType: string;
  contentLength: number;
  url: string;
  // visibility: FileVisibiltiy;
}
