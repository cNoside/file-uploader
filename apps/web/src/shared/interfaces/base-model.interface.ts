import { IUser } from 'modules/users';

export interface IBaseModel {
  id: number;
  createdOn?: string;
  updatedOn?: string;
  createdBy?: IUser;
}
