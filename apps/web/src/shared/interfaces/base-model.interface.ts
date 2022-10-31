import { IUser } from 'modules/users';

export interface IBaseModel {
  id: string;
  createdOn?: string;
  updatedOn?: string;
  createdBy?: IUser;
}
