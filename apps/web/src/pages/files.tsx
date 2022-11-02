import {
  Container,
  Title,
  createStyles,
  Text,
  TextInput,
  useMantineTheme,
  SegmentedControl
} from '@mantine/core';
import { IconSearch } from '@tabler/icons';
import {
  FileDropzone,
  FilesDataInterface,
  getFilesSSR,
  IFile
} from 'modules/files';
import { useFiles } from 'modules/files/hooks/use-files.hook';
import { GetServerSideProps, NextPage } from 'next';
import { NextSeo } from 'next-seo';

const useStyles = createStyles((theme) => {
  return {
    container: {
      maxWidth: '1200px',
      marginBottom: '2rem'
    },
    uploadSection: {
      marginTop: theme.spacing.xl
    },
    filesSection: {
      marginTop: theme.spacing.xl
    }
  };
});

type ServerSideProps = {
  files: IFile[];
};

type Props = ServerSideProps;

const Files: NextPage<Props> = (props) => {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const { files: initialData } = props;

  const { data } = useFiles({
    initialData: {
      status: 'success',
      data: {
        files: initialData
      }
    },
    // refetchInterval: 1000
  });
  const files = data?.data.files || [];

  return (
    <>
      <NextSeo title="Files" />
      <Container className={classes.container}>
        <section className={classes.uploadSection}>
          <Title order={2}>Upload Files</Title>
          <FileDropzone />
        </section>

        <section className={classes.filesSection}>
          <FilesDataInterface files={files} />
        </section>
      </Container>
    </>
  );
};

export default Files;

export const getServerSideProps: GetServerSideProps<ServerSideProps> = async (
  ctx
) => {
  const files = await getFilesSSR(ctx);

  return {
    props: {
      files
    }
  };
};
