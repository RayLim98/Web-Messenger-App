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
    main: '#1565c0',
  },
  secondary: {
    main: '#A30052',
  },
  background: {
    default: '#ffffff',
    paper: '#1565c0'
  },
  text: {
    primary: '#000000',
    secondary: '#A30052',
  } 
}

export const dark: PaletteOptions = {
  primary: {
    main: '#000644',
  },
  secondary: {
    main: '#db3d8d',
  },
  background: {
    default: '#212121',
    paper: '#1565c0'
  },
  text: {
    primary: '#ffffff',
    secondary: '#db3d8d'
  } 
}