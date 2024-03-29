import React, { useState } from 'react'
import MobileDrawer from '../drawer';
import {AppBar, IconButton, Box, Stack, Typography, useTheme, Toolbar} from "@mui/material"
// Hooks
import { useMode } from '../../../App';

// Icons
import MenuIcon from '@mui/icons-material/Menu';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

interface Props {
    lobbyTitle: string
    disableDrawer?: boolean
    relative?: boolean
}

const MobileHeader = ({lobbyTitle, disableDrawer, relative}: Props) => {
    const [drawer, setDrawer] = useState(false)
    const { toggleMode } = useMode()
    const { palette } = useTheme()

    return (
        <>
            <AppBar 
                position={relative ? 'relative': 'fixed'} 
                sx={{
                    backgroundColor: 'primary.main'
                }}>
                    <Toolbar>
                        {
                            !disableDrawer && 
                            <IconButton size="large" onClick={()=> setDrawer(true)}>
                                <MenuIcon fontSize="inherit"/>
                            </IconButton>
                        }
                        <Box sx={{ flex: 1}}>
                            <Typography variant={"h4"}>
                                {lobbyTitle}
                            </Typography>
                        </Box>
                        <IconButton size="large" onClick={()=> toggleMode()}>
                            { 
                                palette.mode === "light"
                                ? <DarkModeIcon/>
                                : <LightModeIcon/>
                            }
                        </IconButton>
                    </Toolbar>
            </AppBar>
            <MobileDrawer open={drawer} setOpen={setDrawer}/>
        </>
    )
}

export default MobileHeader