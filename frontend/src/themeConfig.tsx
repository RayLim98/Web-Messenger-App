import { PaletteOptions } from '@mui/material';

declare module '@mui/material/styles' {
    interface Theme {
        status: {
        danger: string;
        };
    }
    // allow configuration using `createTheme`
    interface ThemeOptions {
        status?: {
        danger?: string;
        };
    }
    interface PaletteOptions {
        custom?: {
            main?: string
        }
    }
}

export const light: PaletteOptions = {
  primary: {
    main: '#5998C5',
  },
  secondary: {
    main: '#ad1457',
    light: '#e35183',
    dark: '#78002e',
  },
  text: {
    primary: '#000000',
    secondary: '#ffffff'
  },
}

export const dark: PaletteOptions = {
  primary: {
    main: '#04293A',
    light: '#041C32',
    dark: '#064663',
    contrastText: '#ECB365'
  },
  secondary: {
    main: '#ad1457',
    light: '#e35183',
    dark: '#78002e',
  },
  text: {
    primary: '#ffffff',
    secondary: '#000000'
  },
}
