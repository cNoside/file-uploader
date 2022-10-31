import { TextInput, Group, Badge, ActionIcon } from '@mantine/core';
import { IconChevronDown, IconSearch } from '@tabler/icons';
type Props = {
  onChange: (value: string) => void;
};

export const SearchFilter = (props: Props) => {
  const { onChange } = props;

  return (
    <TextInput
      size="sm"
      icon={<IconSearch />}
      placeholder="Search files"
      style={{ flexGrow: 1 }}
      rightSectionWidth={150}
      rightSection={
        <Group>
          <Badge color="orange">File Name</Badge>
          <ActionIcon>
            <IconChevronDown />
          </ActionIcon>
        </Group>
      }
      onChange={(event) => onChange(event.currentTarget.value)}
    />
  );
};
