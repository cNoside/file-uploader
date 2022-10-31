import { GetServerSidePropsContext } from 'next';
import { IFile } from 'modules/files';
import { getCookie } from 'cookies-next';
import { JWT_COOKIE_KEY } from 'shared/constants';
import { FilesAPI } from '../api/files.api';
import axios from 'axios';
import { env } from 'shared/config';

export const getFilesSSR = async (
  ctx: GetServerSidePropsContext
): Promise<IFile[]> => {
  const jwt = getCookie(JWT_COOKIE_KEY, ctx) as string;

  const filesAPI = new FilesAPI(
    axios.create({
      baseURL: env.apiUrl,
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    })
  );

  const res = await filesAPI.findAll();
  if (res.status === 'success') {
    return res.data.files;
  }
  return [];
};
