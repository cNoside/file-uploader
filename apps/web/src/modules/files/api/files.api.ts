import { BaseAPI } from 'shared/api';
import { IResponse } from 'shared/interfaces';

import { IFile, generateFile } from 'modules/files';
import { faker } from '@faker-js/faker';
import { sleep } from 'shared/utils';
import { IServerValidationError } from '../../../shared/interfaces/server-validation-error.interface';

type FindFilesResponse = IResponse<{ files: IFile[] }, 'success'>;

type FindFileResponse = IResponse<{ file: IFile }, 'success'>;

type UpdateFileSuccessResponse = IResponse<{ message: string }, 'success'>;
type UpdateFileFailResponse = IResponse<
  { message: string; errors: IServerValidationError<IFile>[] },
  'fail'
>;
type UpdateFileResponse = UpdateFileSuccessResponse | UpdateFileFailResponse;

export class FilesAPI extends BaseAPI {
  async findAll(): Promise<FindFilesResponse> {
    // const res = await this.axios.get('/files');
    // return res.data;

    await sleep();
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

  async findOne(id: string): Promise<FindFileResponse> {
    // const res = await this.axios.get(`/files/${id}`);
    // return res.data;

    await sleep();
    return {
      status: 'success',
      data: {
        file: generateFile({ id })
      }
    };
  }

  async updateOne(
    id: string,
    data: Partial<IFile>
  ): Promise<UpdateFileResponse> {
    // const res = await this.axios.patch(`/files/${id}`, data);
    // return res.data;

    await sleep();
    const isSuccess = faker.datatype.boolean();
    // if (isSuccess) {
    //   return {
    //     status: 'success',
    //     data: {
    //       message: 'File updated successfully'
    //     }
    //   };
    // }
    return {
      status: 'fail',
      data: {
        message: 'Validation failed',
        errors: [
          {
            field: 'name',
            message: 'Name already exists'
          },
          {
            field: 'name',
            message: 'Extension is not allowed'
          }
        ]
      }
    };
  }
}

export const clientFilesAPI = new FilesAPI();
