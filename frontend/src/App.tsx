import { createContext, useContext, useMemo, useState } from 'react'
import { createTheme, PaletteMode, ThemeOptions, ThemeProvider } from '@mui/material';
import { AuthProvider } from './context/authProvider';
import { dark, light } from './themeConfig';
import BgWrapper from './components/core/wrapper/bgWrapper';
import RouteHandler from './routes';

const ModeContext = createContext({ toggleMode: ()=> {}})

function App() {
  const [mode, setMode] = useState<PaletteMode>('light')

  const toggleMode = () => setMode(mode === 'light'? 'dark': 'light' )

  const theme = useMemo(()=> createTheme(getDisplayMode(mode)), [mode])
  return (
    <ModeContext.Provider value={{ toggleMode }}>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <BgWrapper>
            <RouteHandler/>
          </BgWrapper>
        </AuthProvider>
      </ThemeProvider>
    </ModeContext.Provider>
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

const getDisplayMode = (mode: PaletteMode): ThemeOptions => ({
  palette:{
    mode,
    ...(mode ==='light' ? light : dark) 
  }
})
