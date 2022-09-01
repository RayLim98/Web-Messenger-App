import { Drawer, Typography, Button, ListItem, List, ListItemButton, Divider, IconButton, ListItemText, ListItemIcon } from '@mui/material'
import React, {useState} from 'react'
import UserBanner from '../banner/userBanner'
import LogoutIcon from '@mui/icons-material/Logout';
import AddIcon from '@mui/icons-material/Add';
import { useComm } from '../../../context/commProvider';
import { useAuth } from '../../../context/authProvider';

const lobbyList = [
    'lobby1',
    'lobby2',
]

interface Props {
    userImage: null | string
    open: boolean
    setOpen: (value:boolean) => void
}

const MainDrawer = ({open, setOpen, userImage}: Props) => {
    const {} = useComm()
    const {logout} = useAuth()

    const handleSelection = () => {
        
    }

    return (
        <Drawer 
            anchor={"left"} 
            open={open}
            onClose={()=> setOpen(false)}
            sx={{
                "& .MuiPaper-root": {
                    backgroundColor: "primary.main"
                }
            }}
        >
            <List>
                <ListItem>
                    <UserBanner userImage={userImage} size={7}/>
                </ListItem>
                <Divider/>
                <ListItem>
                    <ListItemButton>
                        <ListItemText>
                            Add Server
                        </ListItemText>
                        <AddIcon/>
                    </ListItemButton>
                </ListItem>
                <List 
                    sx={{
                        overflow: "scroll"
                    }}
                >
                    {
                        lobbyList.map((item)=> {
                            return (
                                <ListItem>
                                    <ListItemButton onClick={handleSelection}>
                                        <Typography variant="h5">
                                            {item}
                                        </Typography>
                                    </ListItemButton>
                                </ListItem>
                            )
                        })
                    }
                </List>
                <Divider/>
                <ListItem>
                    <ListItemButton onClick={()=> logout()}>
                        <ListItemText>
                            Logout
                        </ListItemText>
                        <LogoutIcon/>
                    </ListItemButton>
                </ListItem>
            </List>
        </Drawer>
    )
}

export default MainDrawer