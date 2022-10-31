import { useState } from 'react';
import { TextInput } from '@mantine/core';
import { useMutation } from '@tanstack/react-query';
import { clientFilesAPI } from '../../../api/files.api';

type Props = {
  filename: string;
  onChange: (filename: string) => void;
};

export const FileNameInput = (props: Props) => {
  const { filename, onChange } = props;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <TextInput
      style={{ flex: 1 }}
      variant="unstyled"
      value={filename}
      onChange={handleChange}
      styles={{
        input: {
          weight: 500,
          fontSize: '0.9rem'
        }
      }}
    />
  );
};
