import { NextSeo } from 'next-seo';
import { Dropzone, FileWithPath } from '@mantine/dropzone';

import { NextPageWithLayout } from 'shared/types';
import {
  Badge,
  Button,
  Card,
  Center,
  createStyles,
  Group,
  Image,
  Stack,
  Text,
  Title,
  useMantineTheme
} from '@mantine/core';
import { IconEdit, IconFile, IconUpload, IconX } from '@tabler/icons';
import { useEffect, useRef, useState } from 'react';

const useStyles = createStyles((theme) => {
  return {
    container: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'stretch',
      paddingTop: '4rem',
      minHeight: 'calc(100vh - 80px)',
      maxWidth: '600px',
      margin: '0 auto'
    },
    iconContainer: {
      background: theme.colors.dark[7],
      padding: theme.spacing.xs,
      borderRadius: theme.radius.sm
    }
  };
});

const Upload: NextPageWithLayout = () => {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const [droppedFile, setDroppedFile] = useState<FileWithPath>();

  const handleDrop = (files: FileWithPath[]) => {
    setDroppedFile(files[0]);
  };

  const handleCancel = () => {
    setDroppedFile(undefined);
  };

  const handleUpload = () => {
    alert('uploaded');
  };

  return (
    <>
      <NextSeo title="Upload" />
      <div className={classes.container}>
        <Title weight="900">Upload</Title>
        <Dropzone
          onDrop={handleDrop}
          maxSize={5 * 1024 * 1024}
          maxFiles={1}
          mt="lg"
          radius="lg"
        >
          <Stack align="center" justify="center" style={{ minHeight: 220 }}>
            <Dropzone.Accept>
              <IconUpload size={50} stroke={1.5} />
            </Dropzone.Accept>
            <Dropzone.Reject>
              <IconX size={50} stroke={1.5} />
            </Dropzone.Reject>
            <Dropzone.Idle>
              <IconFile size={50} stroke={1.5} />
            </Dropzone.Idle>
            <Text size="xl" inline>
              Drag file or click to{' '}
              <Text component="span" color="orange">
                browse
              </Text>
            </Text>
            <Text size="sm" color="dimmed" inline mt={7}>
              Max. file size 5mb
            </Text>
          </Stack>
        </Dropzone>
        {droppedFile && (
          <Card mt="md" shadow="sm" p="lg" radius="lg" withBorder>
            <Group align="center" position="apart">
              <Group align="flex-start">
                <Center className={classes.iconContainer}>
                  <IconFile />
                </Center>
                <div>
                  <Text>{droppedFile.name}</Text>
                  <Text size="xs" color="dimmed">
                    {droppedFile.size} kb
                  </Text>
                </div>
              </Group>

              <Group>
                <IconEdit size={25} stroke={1.6} color={theme.colors.gray[6]} />
                <IconX
                  size={25}
                  stroke={2}
                  color={theme.colors.red[theme.colorScheme === 'dark' ? 8 : 6]}
                  onClick={handleCancel}
                />
              </Group>
            </Group>
          </Card>
        )}

        <Group
          mt="md"
          position="apart"
          sx={{
            button: {
              flex: 1,
              borderRadius: theme.radius.lg
            }
          }}
        >
          <Button color="gray" size="md" onClick={handleCancel}>
            Cancel
          </Button>
          <Button color="orange" size="md">
            Upload
          </Button>
        </Group>
      </div>
    </>
  );
};

export default Upload;
