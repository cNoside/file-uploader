import { BaseAPI } from 'shared/api';
import { IResponse } from 'shared/interfaces';

import { IFile, generateFile } from 'modules/files';
import { faker } from '@faker-js/faker';
import { sleep } from 'shared/utils';
import { IServerValidationError } from '../../../shared/interfaces/server-validation-error.interface';

export type FindFilesResponse = IResponse<{ files: IFile[] }, 'success'>;

type FindFileResponse = IResponse<{ file: IFile }, 'success'>;

type CreateFileSuccessResponse = IResponse<{ file: IFile }, 'success'>;
type CreateFileResponse = CreateFileSuccessResponse;

type UpdateFileSuccessResponse = IResponse<{ message: string }, 'success'>;
type UpdateFileFailResponse = IResponse<
  { message: string; errors: IServerValidationError<IFile>[] },
  'fail'
>;
type UpdateFileResponse = UpdateFileSuccessResponse | UpdateFileFailResponse;

type DeleteFileSuccessResponse = IResponse<{ message: string }, 'success'>;
type DeleteFileResponse = DeleteFileSuccessResponse;

export class FilesAPI extends BaseAPI {
  async findAll(): Promise<FindFilesResponse> {
    await sleep();

    const res = await this.axios.get('/files');
    return res.data;

    return {
      status: 'success',
      data: {
        files: Array(
          faker.datatype.number({
            min: 25,
            max: 100
          })
        )
          .fill(0)
          .map(() => generateFile())
      }
    };
  }

  async findOne(id: number): Promise<FindFileResponse> {
    await sleep();

    // const res = await this.axios.get(`/files/${id}`);
    // return res.data;

    return {
      status: 'success',
      data: {
        file: generateFile({ id })
      }
    };
  }

  async create(userId: number, dto: FormData): Promise<CreateFileResponse> {
    await sleep();

    // const res = await this.axios.get(`/files/users/${userId}`);
    const res = await this.axios.post(`/files/users/${1}`, dto, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return res.data;
  }

  async updateOne(
    id: number,
    data: Partial<IFile>
  ): Promise<UpdateFileResponse> {
    await sleep();

    // const res = await this.axios.patch(`/files/${id}`, data);
    // return res.data;

    const isSuccess = faker.datatype.boolean();
    if (isSuccess) {
      return {
        status: 'success',
        data: {
          message: 'File updated successfully'
        }
      };
    }
    return {
      status: 'fail',
      data: {
        message: 'Validation failed',
        errors: [
          {
            field: 'ownerId',
            message: 'ownerId is not valid'
          },
          {
            field: 'filename',
            message: 'Invalid filename'
          }
        ]
      }
    };
  }

  async deleteFile(id: number): Promise<DeleteFileResponse> {
    await sleep(1000);

    const res = await this.axios.delete(`/files/${id}`);
    return res.data;
  }
}

export const clientFilesAPI = new FilesAPI();
