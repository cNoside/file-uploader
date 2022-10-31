import { IBaseModel } from 'shared/interfaces';
import { FileVisibiltiy } from 'modules/files';

export interface IFile extends IBaseModel {
  name: string;
  path: string;
  type: string;
  extension: string;
  size: number;
  visibility: FileVisibiltiy;
}
