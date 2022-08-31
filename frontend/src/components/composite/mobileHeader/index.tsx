import React, { useState } from 'react'
import MainDrawer from '../drawer';
import {AppBar, IconButton, Box, Stack, Typography, useTheme, Toolbar} from "@mui/material"
// Hooks
import { useMode } from '../../../App';

// Icons
import MenuIcon from '@mui/icons-material/Menu';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

interface Props {
    lobby: string
}

const MobileHeader = ({lobby}: Props) => {
    const [open, setOpen] = useState(false)
    const { toggleMode } = useMode()
    const { palette } = useTheme()
    return (
        <>
            <AppBar 
                sx={{
                    backgroundColor: 'primary.main'
                }}>
                    <Toolbar>
                        <IconButton size="large" onClick={()=> setOpen(true)}>
                            <MenuIcon fontSize="inherit"/>
                        </IconButton>
                        <Box sx={{ flex: 1}}>
                            <Typography variant={"h4"}>
                                LobbyID here
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
            <MainDrawer open={open} setOpen={setOpen} userImage={null}/>
        </>
    )
}

export default MobileHeader