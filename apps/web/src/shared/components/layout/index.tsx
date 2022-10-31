import {
  ActionIcon,
  Anchor,
  AppShell,
  Aside,
  Avatar,
  Burger,
  Button,
  createStyles,
  Divider,
  Footer,
  Group,
  Header,
  MediaQuery,
  Menu,
  Navbar,
  Stack,
  Text,
  TextInput,
  UnstyledButton,
  useMantineTheme
} from '@mantine/core';
import { useState } from 'react';

import { HeaderProps } from './header.component';

// import { Header, HeaderProps } from './header.component';
import { Navbar as MyNavbar } from './navbar.component';
import NextLink from 'next/link';
import Image from 'next/image';
import {
  IconChevronRight,
  IconDashboard,
  IconDots,
  IconFile,
  IconFile3d,
  IconHeart,
  IconHelp,
  IconHome,
  IconLayoutDashboard,
  IconLogout,
  IconMessage,
  IconPlayerPause,
  IconSearch,
  IconSettings,
  IconStar,
  IconSwitchHorizontal,
  IconTrash,
  IconUpload,
  IconUsers
} from '@tabler/icons';
import { APP_ROUTES } from '../../constants/app-routes.constant';
import { UserMenu } from '../ui';
import { useSession } from 'modules/auth';

const useStyles = createStyles((theme) => {
  const orange =
    theme.colorScheme === 'dark'
      ? theme.colors.orange[7]
      : theme.colors.orange[5];
  return {
    logo: {
      position: 'relative',
      color: orange,
      '::after': {
        content: '""',
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '1px',
        backgroundColor: orange,
        transform: 'scaleX(0)',
        transformOrigin: 'left',
        transition: '0.1s ease-out'
      },
      ':hover': {
        '::after': {
          transform: 'scaleX(1)'
        }
      }
    }
  };
});

type Props = {
  children: React.ReactNode;
  headerProps?: HeaderProps;
};

export const Layout = (props: Props) => {
  const { children, headerProps } = props;
  const theme = useMantineTheme();
  const [isNavOpen, setIsNavOpen] = useState(true);
  const { classes } = useStyles();

  const { session } = useSession();

  return (
    // <AppShell
    //   // header={<Header {...headerProps} />}
    //   navbar={<Navbar />}
    // >
    //   <main>{children}</main>
    // </AppShell>
    <AppShell
      // header={
      //   <Header height={70} p="md">
      //     <div
      //       style={{ display: 'flex', alignItems: 'center', height: '100%' }}
      //     >
      //       <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
      //         <Burger
      //           opened={opened}
      //           onClick={() => setOpened((o) => !o)}
      //           size="sm"
      //           color={theme.colors.gray[6]}
      //           mr="xl"
      //         />
      //       </MediaQuery>

      //       <Text>Application header</Text>
      //     </div>
      //   </Header>
      // }
      // navbarOffsetBreakpoint="sm"
      navbar={
        <Navbar
          p="md"
          hiddenBreakpoint="sm"
          hidden={isNavOpen}
          width={{
            sm: 300
          }}
          style={{
            justifyContent: 'space-between'
          }}
        >
          <div>
            <NextLink href="/" passHref>
              <Anchor className={classes.logo} underline={false}>
                <Group>
                  {/* <Image
                    src="/logo.svg"
                    alt="logo"
                    width={25}
                    height={25}
                  /> */}
                  <Text
                    weight={700}
                    style={{
                      fontSize: '1.5rem'
                    }}
                  >
                    File Uploader
                  </Text>
                </Group>
              </Anchor>
            </NextLink>

            <TextInput my="1.5rem" icon={<IconSearch />} placeholder="Search" />

            <Stack spacing="xs">
              <NextLink href={APP_ROUTES.HOME} passHref>
                <Button
                  component="a"
                  variant="subtle"
                  color="gray"
                  styles={{
                    inner: {
                      justifyContent: 'start'
                    }
                  }}
                  leftIcon={<IconHome />}
                >
                  Home
                </Button>
              </NextLink>
              <NextLink href={APP_ROUTES.DASHBOARD} passHref>
                <Button
                  component="a"
                  variant="subtle"
                  color="gray"
                  styles={{
                    inner: {
                      justifyContent: 'start'
                    }
                  }}
                  leftIcon={<IconLayoutDashboard />}
                >
                  Dashboard
                </Button>
              </NextLink>
              <NextLink href={APP_ROUTES.UPLOAD} passHref>
                <Button
                  component="a"
                  variant="subtle"
                  color="gray"
                  styles={{
                    inner: {
                      justifyContent: 'start'
                    }
                  }}
                  leftIcon={<IconUpload />}
                >
                  Upload
                </Button>
              </NextLink>
              <NextLink href={APP_ROUTES.FILES} passHref>
                <Button
                  component="a"
                  variant="subtle"
                  color="gray"
                  styles={{
                    inner: {
                      justifyContent: 'start'
                    }
                  }}
                  leftIcon={<IconFile />}
                >
                  Files
                </Button>
              </NextLink>
              <NextLink href={APP_ROUTES.USERS} passHref>
                <Button
                  component="a"
                  variant="subtle"
                  color="gray"
                  styles={{
                    inner: {
                      justifyContent: 'start'
                    }
                  }}
                  leftIcon={<IconUsers />}
                >
                  Users
                </Button>
              </NextLink>
            </Stack>
          </div>

          <div>
            <Stack spacing="xs">
              <NextLink href={APP_ROUTES.USERS} passHref>
                <Button
                  component="a"
                  variant="subtle"
                  color="gray"
                  styles={{
                    inner: {
                      justifyContent: 'start'
                    }
                  }}
                  leftIcon={<IconHelp />}
                >
                  Support
                </Button>
              </NextLink>
              <NextLink href={APP_ROUTES.USERS} passHref>
                <Button
                  component="a"
                  variant="subtle"
                  color="gray"
                  styles={{
                    inner: {
                      justifyContent: 'start'
                    }
                  }}
                  leftIcon={<IconSettings />}
                >
                  Settings
                </Button>
              </NextLink>
            </Stack>
            <Divider my="1rem" />

            <UserMenu user={session.data.user} />
          </div>
        </Navbar>
      }
      // asideOffsetBreakpoint="sm"
      // aside={
      //   <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
      //     <Aside p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 300 }}>
      //       <Text>Application sidebar</Text>
      //     </Aside>
      //   </MediaQuery>
      // }
      // footer={
      //   <Footer height={60} p="md">
      //     Application footer
      //   </Footer>
      // }
    >
      {children}
    </AppShell>
  );
};
