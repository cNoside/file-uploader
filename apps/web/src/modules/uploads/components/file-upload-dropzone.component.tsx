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
import { useState } from 'react';

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

export const FileUploadDropzone = (props: Props) => {
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
    <div className={classes.container}>
      <Dropzone
        onDrop={handleDrop}
        maxSize={5 * 1024 * 1024}
        maxFiles={1}
        radius="lg"
      >
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
    </div>
  );
};
