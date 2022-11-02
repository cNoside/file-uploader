import {
  IconChevronRight,
  IconLogout,
  IconPlayerPause,
  IconSettings,
  IconSwitchHorizontal,
  IconTrash
} from '@tabler/icons';
import { truncate } from 'lodash';
import {
  Avatar,
  Button,
  Group,
  Menu,
  Text,
  UnstyledButton
} from '@mantine/core';

import { IUser } from 'modules/users';
import { faker } from '@faker-js/faker';
import { useSession } from '../../../../modules/auth/hooks/use-session.hook';

type Props = {
  user?: IUser;
};

export const UserMenu = (props: Props) => {
  const { user } = props;

  const { login, logout } = useSession();

  return (
    <Menu withArrow width={300} position="bottom" transition="pop">
      <Menu.Target>
        <UnstyledButton
          sx={(theme) => ({
            display: 'block',
            width: '100%',
            padding: theme.spacing.md,
            color:
              theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

            '&:hover': {
              backgroundColor:
                theme.colorScheme === 'dark'
                  ? theme.colors.dark[8]
                  : theme.colors.gray[0]
            }
          })}
        >
          <Group>
            <Avatar radius="xl" src={user?.avatar} />

            <div style={{ flex: 1 }}>
              <Text size="sm" weight={500}>
                {user?.name}
              </Text>

              <Text color="dimmed" size="xs">
                {truncate(user?.email, {
                  length: 20
                })}
              </Text>
            </div>

            <IconChevronRight size={16} />
          </Group>
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item onClick={() => login('root@internal.com', 'root')}>
          Login
        </Menu.Item>
        <Menu.Label>Settings</Menu.Label>
        <Menu.Item icon={<IconSettings size={14} stroke={1.5} />}>
          Account settings
        </Menu.Item>
        <Menu.Item icon={<IconSwitchHorizontal size={14} stroke={1.5} />}>
          Change account
        </Menu.Item>
        <Menu.Item
          icon={<IconLogout size={14} stroke={1.5} />}
          onClick={() => logout()}
        >
          Logout
        </Menu.Item>

        <Menu.Divider />

        <Menu.Label>Danger zone</Menu.Label>
        <Menu.Item icon={<IconPlayerPause size={14} stroke={1.5} />}>
          Pause subscription
        </Menu.Item>
        <Menu.Item color="red" icon={<IconTrash size={14} stroke={1.5} />}>
          Delete account
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
