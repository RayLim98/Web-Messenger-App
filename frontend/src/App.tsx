import { createContext, useContext, useMemo, useState } from 'react'
import { createTheme, PaletteMode, ThemeOptions, ThemeProvider, responsiveFontSizes  } from '@mui/material';
import { AuthProvider } from './context/authProvider';
import { dark, light } from './themeConfig';
import BgWrapper from './components/core/wrapper/bgWrapper';
import RouteHandler from './routes';
import { CommProvider } from './context/commProvider';
import { BrowserRouter } from 'react-router-dom';

const ModeContext = createContext({ 
  toggleMode: ()=> {}
})

function App() {
  const [mode, setMode] = useState<PaletteMode>('light')
  // Hello world from git 

  const toggleMode = () => setMode(mode === 'light'? 'dark': 'light' )

  let theme = useMemo(()=> createTheme(getThemeOptions(mode)), [mode])
  theme = responsiveFontSizes(theme);

  return (
    <BrowserRouter>
      <AuthProvider>
        <CommProvider>
          <ModeContext.Provider value={{ toggleMode }}>
            <ThemeProvider theme={theme}>
              <BgWrapper>
                <RouteHandler/>
              </BgWrapper>
            </ThemeProvider>
          </ModeContext.Provider>
        </CommProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;



export const useMode = () => {
  const mode = useContext(ModeContext)
  if(!mode) {
    throw new Error("useMode is null perhaps used outside of provider")
  }
  return mode
}

const getThemeOptions = (mode: PaletteMode): ThemeOptions => ({
  palette:{
    mode,
    ...(mode ==='light' ? light : dark) 
  }
})
