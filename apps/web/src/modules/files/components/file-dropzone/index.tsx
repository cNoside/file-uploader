import { Dropzone, FileWithPath } from '@mantine/dropzone';
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
import { useState, useEffect } from 'react';
import { UploadedFileCard } from './uploaded-file-card';

const useStyles = createStyles((theme) => {
  return {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'stretch'
    },
    iconContainer: {
      background: theme.colors.dark[7],
      padding: theme.spacing.xs,
      borderRadius: theme.radius.sm
    }
  };
});

type Props = {};

export const FileDropzone = (props: Props) => {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const [droppedFiles, setDroppedFiles] = useState<FileWithPath[]>([
    // {
    //   name: 'test.txt',
    //   size: 1
    // } as any
  ]);

  const addDroppedFiles = (files: FileWithPath[]) => {
    setDroppedFiles((prev) => [...prev, ...files]);
  };

  const removeDroppedFile = (file: FileWithPath) => {
    setDroppedFiles((prev) => prev.filter((f) => f !== file));
  };

  useEffect(() => {
    console.log(droppedFiles.length);
  }, [droppedFiles]);

  // const mutation

  const handleUpload = () => {
    alert('uploaded');
  };

  return (
    <div className={classes.container}>
      <Dropzone onDrop={addDroppedFiles} maxSize={5 * 1024 * 1024} radius="lg">
        <Stack align="center" justify="center" style={{ minHeight: 200 }}>
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

      {droppedFiles.map((file, i) => (
        <UploadedFileCard file={file} key={`uploaded-file-card-${i}`} removeDroppedFile={removeDroppedFile} />
      ))}
    </div>
  );
};
