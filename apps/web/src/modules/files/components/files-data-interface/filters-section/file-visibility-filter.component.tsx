import { SegmentedControl } from '@mantine/core';

import { IFile, FileVisibiltiy } from 'modules/files';

export type VisiblityFilter = FileVisibiltiy | 'all';

interface IVisibilityData {
  label: string;
  value: VisiblityFilter;
}

const VISIBLITY_DATA: IVisibilityData[] = [
  { label: 'All Files', value: 'all' },
  { label: 'Your Files', value: 'private' },
  { label: 'Shared Files', value: 'public' }
];

type Props = {
  onChange?: (value: VisiblityFilter) => void;
};

export const FileVisibilityControl = (props: Props) => {
  const { onChange } = props;

  return (
    <SegmentedControl
      fullWidth
      my="md"
      onChange={onChange}
      size="sm"
      data={VISIBLITY_DATA}
    />
  );
};
