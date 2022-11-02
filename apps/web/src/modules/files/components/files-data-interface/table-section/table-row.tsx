import {
  Checkbox,
  Group,
  Badge,
  ActionIcon,
  useMantineTheme,
  Popover,
  Text,
  Loader,
  Tooltip,
  CopyButton
} from '@mantine/core';
import { getFileIcon } from '../../../utils/get-file-icon.util';
import { FileNameInput } from './name-input.component';
import { getFileSizeString } from '../../../utils/get-file-size-string.util';
import {
  IconDeviceFloppy,
  IconShare,
  IconTrash,
  IconX,
  IconChevronDown,
  IconExternalLink,
  IconCheck
} from '@tabler/icons';
import { IFile } from 'modules/files';
import { useState, useEffect, useMemo } from 'react';
import { difference, isEqual } from 'lodash';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { clientFilesAPI } from '../../../api/files.api';
import { IServerValidationError } from '../../../../../shared/interfaces/server-validation-error.interface';
import { client } from '../../../../../shared/config/axios.config';
import { Menu } from '@mantine/core';
import NextLink from 'next/link';
import { IconLink } from '@tabler/icons';

type Props = {
  file: IFile;
  isSelected: boolean;
  onChange: (id: number) => void;
};

export const TableRow = (props: Props) => {
  const { file, isSelected, onChange } = props;

  const theme = useMantineTheme();

  const [filename, setFilename] = useState(file.filename);
  const handleFilenameChange = (newFilename: string) => {
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
    setFilename(file.filename);
    mutation.reset();
  };

  // TODO: trigger handleClosePopover when clicking outside of popover
  let popoverRef: HTMLDivElement | null = null;

  const queryClient = useQueryClient();

  const deleteMutation = useMutation(
    () => {
      return clientFilesAPI.deleteFile(file.id);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['/files']);
      }
    }
  );
  const handleDelete = () => {
    deleteMutation.mutate();
  };

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
          {/* <Badge
            size="xs"
            color={file.visibility === 'private' ? 'gray' : 'green'}
          >
            {file.visibility}
          </Badge> */}
        </Group>
      </td>
      <td>{getFileSizeString(file.contentLength)}</td>
      <td>
        <Group spacing="sm" position="right">
          <Group spacing="sm">
            <NextLink href={file.url} passHref>
              <a target="_blank">
                <Tooltip label="Open" position="right">
                  <ActionIcon>
                    <IconExternalLink />
                  </ActionIcon>
                </Tooltip>
              </a>
            </NextLink>
            <CopyButton value={file.url} timeout={2000}>
              {({ copied, copy }) => (
                <Tooltip
                  label={copied ? 'Copied' : 'Copy'}
                  position="right"
                  withArrow
                >
                  <ActionIcon color={copied ? 'teal' : 'gray'} onClick={copy}>
                    {copied ? <IconCheck size={25} /> : <IconLink size={25} />}
                  </ActionIcon>
                </Tooltip>
              )}
            </CopyButton>
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
          </Group>
          <Menu width={200}>
            <Menu.Target>
              <ActionIcon ml="sm">
                <IconChevronDown />
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item>Share</Menu.Item>
              <Menu.Item
                onClick={handleDelete}
                color="red"
                icon={
                  deleteMutation.isLoading ? (
                    <Loader size={14} />
                  ) : (
                    <IconTrash size={14} />
                  )
                }
              >
                Delete
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </td>
    </tr>
  );
};
