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
import { FilesDataInterface, getFilesSSR, IFile } from 'modules/files';
import { FileUploadDropzone } from 'modules/uploads';
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
  const { files } = props;

  return (
    <>
      <NextSeo title="Files" />
      <Container className={classes.container}>
        <section className={classes.uploadSection}>
          <Title order={2}>Upload Files</Title>
          <FileUploadDropzone />
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
