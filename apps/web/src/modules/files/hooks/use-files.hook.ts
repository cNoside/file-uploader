import { useQuery } from '@tanstack/react-query';

import { clientFilesAPI, FindFilesResponse } from '../api/files.api';
import { IFile } from '../interfaces';

type Props = {
  initialData?: FindFilesResponse;
  refetchInterval?: number;
};

export const useFiles = (props: Props) => {
  const query = useQuery<FindFilesResponse>({
    queryKey: ['/files'],
    queryFn: () => clientFilesAPI.findAll(),
    initialData: props.initialData,
    refetchInterval: props.refetchInterval
  });

  return query;
};
