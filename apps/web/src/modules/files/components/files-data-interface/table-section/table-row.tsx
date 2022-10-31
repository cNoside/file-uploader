import {
  Checkbox,
  Group,
  Badge,
  ActionIcon,
  useMantineTheme,
  Popover,
  Text
} from '@mantine/core';
import { getFileIcon } from '../../../utils/get-file-icon.util';
import { FileNameInput } from './name-input.component';
import { getFileSizeString } from '../../../utils/get-file-size-string.util';
import {
  IconDeviceFloppy,
  IconShare,
  IconTrash,
  IconX,
  IconChevronDown
} from '@tabler/icons';
import { IFile } from 'modules/files';
import { useState, useEffect, useMemo } from 'react';
import { difference, isEqual } from 'lodash';
import { useMutation } from '@tanstack/react-query';
import { clientFilesAPI } from '../../../api/files.api';
import { IServerValidationError } from '../../../../../shared/interfaces/server-validation-error.interface';

type Props = {
  file: IFile;
  isSelected: boolean;
  onChange: (filename: string) => void;
};

export const TableRow = (props: Props) => {
  const { file, isSelected, onChange } = props;

  const theme = useMantineTheme();

  const [filename, setFilename] = useState(file.name);
  const handleFilenameChange = (newFilename: string) => {
    console.log('handleFilenameChange', newFilename);
    setFilename(newFilename);
  };

  const newFile = {
    ...file,
    name: filename
  };

  const isDirty = useMemo(() => {
    return !isEqual(file, newFile);
  }, [newFile]);

  const mutation = useMutation(
    (newFile: IFile) => {
      return clientFilesAPI.updateOne(file.id, newFile);
    },
    {
      onSuccess: (res) => {
        if (res.status === 'success') {
        } else if (res.status === 'fail') {
        }
      }
    }
  );

  const handleSave = () => {
    mutation.mutate(newFile);
  };

  const isFail = mutation.data?.status === 'fail';
  const [popoverOpened, setPopoverOpened] = useState(false);
  useEffect(() => {
    if (isFail) {
      setPopoverOpened(true);
    }
  }, [mutation.data?.status]);
  const handleClosePopover = () => {
    setPopoverOpened(false);
    setFilename(file.name);
    mutation.reset();
  };

  // trigger handleClosePopover when clicking outside of popover
  let popoverRef: HTMLDivElement | null = null;

  return (
    <tr
      style={{
        ...(isFail && {
          backgroundColor: theme.colors.red[0]
        })
      }}
    >
      <td>
        <Checkbox checked={isSelected} onChange={() => onChange(file.id)} />
      </td>
      <td>
        <Group>
          {getFileIcon({ extension: file.extension })}
          <FileNameInput filename={filename} onChange={handleFilenameChange} />
          <Badge
            size="xs"
            color={file.visibility === 'private' ? 'gray' : 'green'}
          >
            {file.visibility}
          </Badge>
        </Group>
      </td>
      <td>{getFileSizeString(file.size)}</td>
      <td>
        <Group spacing="sm">
          <ActionIcon variant="light" color="teal">
            <IconShare />
          </ActionIcon>
          <Popover
            opened={popoverOpened}
            width={200}
            position="bottom-end"
            shadow="md"
            withArrow
          >
            <Popover.Target>
              {popoverOpened ? (
                <ActionIcon
                  variant="light"
                  color="red"
                  onClick={handleClosePopover}
                >
                  <IconX />
                </ActionIcon>
              ) : (
                <ActionIcon
                  variant="light"
                  color="blue"
                  disabled={!isDirty}
                  onClick={handleSave}
                >
                  <IconDeviceFloppy />
                </ActionIcon>
              )}
            </Popover.Target>
            <Popover.Dropdown>
              {mutation.data?.status === 'fail' &&
                mutation.data.data.errors.map((error, i) => (
                  <Text
                    color="red"
                    sx={{ display: 'flex', alignItems: 'center' }}
                    key={`validation-error-message-${i}`}
                    size="sm"
                    mb={5}
                  >
                    <IconX size={15} />
                    <Text ml="xs">{error.message}</Text>
                  </Text>
                ))}
            </Popover.Dropdown>
          </Popover>

          <ActionIcon variant="light" color="red">
            <IconTrash />
          </ActionIcon>
          <ActionIcon ml="sm">
            <IconChevronDown />
          </ActionIcon>
        </Group>
      </td>
    </tr>
  );
};
