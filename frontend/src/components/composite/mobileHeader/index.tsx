import React from 'react'
import MainDrawer from '../drawer';
import {AppBar, IconButton, Box, Stack, Typography, useTheme} from "@mui/material"
// Hooks
import { useMode } from '../../../App';

// Icons
import MenuIcon from '@mui/icons-material/Menu';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
// constants
const headerHeight = 4;

interface Props {
    open: boolean
    setOpen: (value: boolean) => void
}

const MobileHeader = ({open, setOpen}: Props) => {
    const { toggleMode } = useMode()
    const { palette } = useTheme()
    return (
        <>
            <AppBar sx={{height:`${headerHeight}rem`}}>
                <Stack direction={"row"} alignItems={"center"} sx={{height: "100%"}}>
                    <IconButton size="large" onClick={()=> setOpen(true)}>
                        <MenuIcon fontSize="inherit"/>
                    </IconButton>
                    <Box sx={{ flex: 1}}>
                        <Typography variant={"h4"}>
                            LobbyID here
                        </Typography>
                    </Box>
                    <IconButton size="large" onClick={()=> toggleMode()}>
                        { palette.mode === "light"
                        ? <DarkModeIcon/>
                        : <LightModeIcon/>
                        }
                    </IconButton>
                </Stack>
                <MainDrawer open={open} setOpen={setOpen} userImage={null}/>
            </AppBar>
            <div style={{marginBottom: `${headerHeight}rem`}}/>
        </>
    )
}

export default MobileHeader