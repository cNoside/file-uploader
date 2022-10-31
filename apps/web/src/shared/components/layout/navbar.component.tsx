import { MediaQuery, Navbar as MantineNavbar } from '@mantine/core';

type Props = {};

export const Navbar = (props: Props) => {
  return (
    <MediaQuery
      smallerThan="xs"
      styles={{
        display: 'none'
      }}
    >
      <MantineNavbar>
        <p> Sidebar content</p>
      </MantineNavbar>
    </MediaQuery>
  );
};
