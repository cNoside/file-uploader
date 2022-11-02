import {
  Card,
  Center,
  Group,
  useMantineTheme,
  createStyles,
  Loader,
  Button,
  CopyButton,
  Tooltip
} from '@mantine/core';
import { FileWithPath } from '@mantine/dropzone';
import {
  IconFile,
  IconEdit,
  IconX,
  IconMinus,
  IconLink,
  IconCheck,
  IconExternalLink
} from '@tabler/icons';
import { Text, ActionIcon } from '@mantine/core';
import { getFileIcon } from 'modules/files';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { clientFilesAPI } from 'modules/files';
import { useSession } from 'modules/auth';
import { useEffect, useMemo, useState } from 'react';
import { sleep } from 'shared/utils';
import NextLink from 'next/link';
import { useFiles } from 'modules/files/hooks/use-files.hook';
import { client } from 'shared/config';
import { IconTrash } from '@tabler/icons';

type Props = {
  file: FileWithPath;
  removeDroppedFile: (file: FileWithPath) => void;
};

export const UploadedFileCard = (props: Props) => {
  const [hasUploaded, setHasUploaded] = useState(false);

  const { file, removeDroppedFile } = props;

  const theme = useMantineTheme();
  const queryClient = useQueryClient();

  const mutation = useMutation(
    (formData: FormData) => {
      return clientFilesAPI.create(1, formData);
    },
    {
      onMutate: async () => {
        await sleep(1500);
      },
      onSuccess: (res) => {
        queryClient.invalidateQueries(['/files']);
        console.log('success!');
        console.log(res.data.file.url);
      }
    }
  );

  const uploadFile = async () => {
    const formData = new FormData();
    formData.append('file', file);
    setHasUploaded(true);
    mutation.mutate(formData);
  };

  const removeSelf = () => {
    removeDroppedFile(file);
  };

  return (
    <Card mt="md" shadow="sm" p="lg" radius="lg" withBorder>
      <Group align="center" position="apart">
        <Group align="center">
          {getFileIcon({ extension: file.name.split('.').pop() })}
          <div>
            <Text>{file.name}</Text>
            <Text size="xs" color="dimmed">
              {file.size} kb
            </Text>
          </div>
        </Group>

        <Group>
          {!hasUploaded ? (
            <>
              <Button variant="outline" color="gray" onClick={removeSelf}>
                Cancel
              </Button>
              <Button onClick={uploadFile}>Upload</Button>
            </>
          ) : mutation.isLoading ? (
            <Loader />
          ) : (
            <>
              <NextLink href={mutation.data?.data.file.url || '#'} passHref>
                <a target="_blank">
                  <Tooltip label="Open" position="right">
                    <ActionIcon>
                      <IconExternalLink />
                    </ActionIcon>
                  </Tooltip>
                </a>
              </NextLink>
              <CopyButton
                value={mutation.data?.data.file.url || ''}
                timeout={2000}
              >
                {({ copied, copy }) => (
                  <Tooltip
                    label={copied ? 'Copied' : 'Copy'}
                    position="right"
                    withArrow
                  >
                    <ActionIcon color={copied ? 'teal' : 'gray'} onClick={copy}>
                      {copied ? (
                        <IconCheck size={25} />
                      ) : (
                        <IconLink size={25} />
                      )}
                    </ActionIcon>
                  </Tooltip>
                )}
              </CopyButton>

              <Tooltip label="close" position="right">
                <ActionIcon onClick={removeSelf}>
                  <IconMinus
                    size={25}
                    stroke={1.5}
                    color={theme.colors.gray[6]}
                  />
                </ActionIcon>
              </Tooltip>
            </>
          )}
        </Group>
      </Group>
    </Card>
  );
};
