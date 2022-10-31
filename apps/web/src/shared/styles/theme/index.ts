import { ContainerProps, MantineTheme } from '@mantine/core';

// Heading
import '@fontsource/nunito/200.css';
import '@fontsource/nunito/300.css';
import '@fontsource/nunito/400.css';
import '@fontsource/nunito/500.css';
import '@fontsource/nunito/600.css';
import '@fontsource/nunito/700.css';
import '@fontsource/nunito/900.css';

// Body
import '@fontsource/quicksand/300.css';
import '@fontsource/quicksand/400.css';
import '@fontsource/quicksand/500.css';
import '@fontsource/quicksand/600.css';
import '@fontsource/quicksand/700.css';

const ContainerDefaultProps: Partial<ContainerProps> = {
  size: 1000
};
type RecursivePartial<T> = {
  [P in keyof T]?: T[P] extends (infer U)[]
    ? RecursivePartial<U>[]
    : T[P] extends object
    ? RecursivePartial<T[P]>
    : T[P];
};
export const theme: RecursivePartial<MantineTheme> = {
  colorScheme: 'light',
  components: {
    Container: {
      defaultProps: ContainerDefaultProps
    }
  },
  breakpoints: {
    xs: 576,
    sm: 768,
    md: 992,
    lg: 1200,
    xl: 1400
  },
  fontFamily: 'Quicksand, sans-serif',
  headings: {
    fontFamily: 'Nunito, sans-serif'
  },
  primaryShade: {
    light: 6,
    dark: 8
  },
  globalStyles: (theme: MantineTheme) => ({
    main: {
      background:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[8]
          : theme.colors.gray[0]
    }
  })
};
