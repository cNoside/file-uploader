import {
  Center,
  Group,
  Pagination,
  TextInput,
  useMantineTheme
} from '@mantine/core';
import { IconArrowRight } from '@tabler/icons';
import { usePagination } from '@mantine/hooks';
import { IFile } from '../../../interfaces/file.interface';
import { Text } from '@mantine/core';

type Props = {
  pagination: ReturnType<typeof usePagination>;
  totalPages: number;
  files: IFile[];
};

export const PaginationSection = (props: Props) => {
  const { pagination, totalPages, files } = props;

  const theme = useMantineTheme();

  return (
    <section>
      <Group align="flex-end" my="sm" position="apart">
        <Text color="dimmed" size="sm" ml="4px">
          Found {files.length} files
        </Text>
        <Group>
          <Text color="dimmed" size="sm">
            Page {pagination.active} of {totalPages}
          </Text>
          <Group spacing={0}>
            <TextInput
              size="xs"
              variant="unstyled"
              style={{
                borderBottom: `1px solid ${theme.colors.gray[3]}`,
                borderBottomRightRadius: theme.radius.md
              }}
              rightSection={
                <Center
                  style={{
                    background: theme.colors.gray[3],
                    height: '100%',
                    width: '100%',
                    borderTopRightRadius: theme.radius.md,
                    borderBottomRightRadius: theme.radius.md
                  }}
                >
                  <IconArrowRight />
                </Center>
              }
            />
          </Group>
        </Group>
      </Group>

      <Center my="2rem">
        <Pagination
          page={pagination.active}
          onChange={pagination.setPage}
          total={totalPages}
          withEdges
        />
      </Center>
    </section>
  );
};
