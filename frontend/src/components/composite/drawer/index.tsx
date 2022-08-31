import { Drawer, Typography, Button, ListItem, List, ListItemButton, Divider, IconButton, ListItemText } from '@mui/material'
import React, {useState} from 'react'
import UserBanner from '../banner/userBanner'
import LogoutIcon from '@mui/icons-material/Logout';

const lobbyList = [
    'lobby1',
    'lobby2',
    'lob3 ',
    'lob4',
]

interface Props {
    userImage: null | string
    open: boolean
    setOpen: (value:boolean) => void
}

const MainDrawer = ({open, setOpen, userImage}: Props) => {
    return (
        <Drawer 
            anchor={"left"} 
            open={open}
            onClose={()=> setOpen(false)}
        >
            <List>
                <ListItem>
                    <UserBanner userImage={userImage} size={7}/>
                </ListItem>
                <Divider/>
                {
                    lobbyList.map((item)=> {
                        return (
                            <ListItem>
                                <ListItemButton>
                                    <Typography variant="h5">
                                        {item}
                                    </Typography>
                                </ListItemButton>
                            </ListItem>
                        )
                    })
                }
                <Divider/>
                <ListItem>
                    <ListItemButton>
                        <ListItemText>
                            <Typography variant="h6">
                                Logout
                            </Typography>
                        </ListItemText>
                        <LogoutIcon/>
                    </ListItemButton>
                </ListItem>
            </List>
        </Drawer>
    )
}

export default MainDrawer