import { useQuery } from '@tanstack/react-query';

import { clientFilesAPI } from '../api/files.api';

export const useFiles = () => {
  const query = useQuery(['/files'], clientFilesAPI.findAll);
  return query;
};
