import { IFile } from '../../../interfaces/file.interface';
import { useMantineTheme, Menu, Select } from '@mantine/core';
import {
  IconChevronDown,
  IconDotsVertical,
  IconFilter,
  IconSearch,
  IconEdit,
  IconArrowRight,
  IconTrash,
  IconFileImport
} from '@tabler/icons';
import {
  Group,
  Title,
  Text,
  ActionIcon,
  createStyles,
  TextInput,
  Badge,
  Button,
  Center
} from '@mantine/core';

import {
  FileVisibilityControl,
  VisiblityFilter
} from './file-visibility-filter.component';
import { SearchFilter } from './search-filter.component';

const useStyles = createStyles((theme) => {
  return {
    container: {
      padding: `0 ${theme.spacing.lg}px`,
      borderBottom: `1px solid ${theme.colors.gray[3]}`
    }
  };
});

type Props = {
  selected: IFile[];
  onSearchChange: (search: string) => void;
  onVisibilityChange: (visibility: VisiblityFilter) => void;
};

export const FiltersSection = (props: Props) => {
  const { classes } = useStyles();
  const theme = useMantineTheme();

  const { selected, onSearchChange, onVisibilityChange } = props;

  return (
    <section className={classes.container}>
      <Group align="center" mt="lg" position="apart" spacing="xl">
        <SearchFilter onChange={onSearchChange} />

        <Menu shadow="md" width={500} closeOnItemClick={false}>
          <Menu.Target>
            <Button
              variant="light"
              size="sm"
              color="gray"
              leftIcon={<IconFilter />}
            >
              Filters
            </Button>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Label>Size</Menu.Label>
            <Menu.Item>
              <Group>
                <TextInput size="xs" />
                {' - '}
                <TextInput size="xs" />
                <Select
                  defaultValue="kb"
                  data={[
                    {
                      label: 'Kb',
                      value: 'kb',
                    },
                    {
                      label: 'Mb',
                      value: 'mb',
                    },
                    {
                      label: 'Gb',
                      value: 'gb',
                    },
                  ]}
                />
              </Group>
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
        <Menu shadow="md" width={200}>
          <Menu.Target>
            <Button
              variant="light"
              size="sm"
              color="orange"
              leftIcon={<IconEdit />}
              disabled={selected.length < 1}
            >
              Edit ({selected.length})
            </Button>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Label>Edit</Menu.Label>
            <Menu.Item icon={<IconFileImport size={14} />}>Move</Menu.Item>
            <Menu.Divider />
            <Menu.Item color="red" icon={<IconTrash size={14} />}>
              Delete
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>

      <FileVisibilityControl onChange={onVisibilityChange} />
    </section>
  );
};
