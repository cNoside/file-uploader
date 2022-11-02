import { useQuery, useMutation } from '@tanstack/react-query';

import { clientFilesAPI } from '../api';

export const useFile = (id: number) => {
  const query = useQuery(['/files', id], () => clientFilesAPI.findOne(id));

  return query;
};
