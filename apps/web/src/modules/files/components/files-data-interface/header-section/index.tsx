import { IconDotsVertical } from '@tabler/icons';
import { Group, Title, Text, ActionIcon, createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => {
  return {
    container: {
      padding: `0 ${theme.spacing.lg}px`,
      borderBottom: `1px solid ${theme.colors.gray[3]}`
    }
  };
});

export const HeaderSection = () => {
  const { classes } = useStyles();

  return (
    <section className={classes.container}>
      <Group my="lg" position="apart">
        <div>
          <Title order={3}>Manage Files</Title>
          <Text size="sm" color="dimmed">
            Click on a file to view details
          </Text>
        </div>
        <ActionIcon>
          <IconDotsVertical />
        </ActionIcon>
      </Group>
    </section>
  );
};
