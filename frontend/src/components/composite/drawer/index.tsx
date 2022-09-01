import { Drawer, Typography, Button, ListItem, List, ListItemButton, Divider, IconButton, ListItemText, ListItemIcon } from '@mui/material'
import React, {useState} from 'react'
import UserBanner from '../banner/userBanner'
import LogoutIcon from '@mui/icons-material/Logout';
import AddIcon from '@mui/icons-material/Add';
import { useComm } from '../../../context/commProvider';
import { useAuth } from '../../../context/authProvider';
import CreateLobbyModal from '../modals/createLobbyModal';

const lobbies= [
    "Room1",
    "Room2",
    "Room3",
]

interface Props {
    open: boolean
    setOpen: (value:boolean) => void
}

const MainDrawer = ({open, setOpen}: Props) => {
    const [modalOpen, setModalOpen] = useState(false)
    const {user, logout} = useAuth()
    const {setLobby, leaveLobby, joinLobby} = useComm()

    const handleSelection = (value: string) => {
        leaveLobby()
        setLobby(value)
        joinLobby(value)
        setOpen(false)
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
            <CreateLobbyModal 
                open={modalOpen}
                onClose={setModalOpen} 
            />
            <List>
                <ListItem>
                    <ListItemText>
                        {user?.userName}
                    </ListItemText>
                </ListItem>
                <Divider/>
                <ListItem>
                    <UserBanner userImage={user?.image} size={7}/>
                </ListItem>
                <Divider/>
                <ListItem>
                    <ListItemButton onClick={()=> setModalOpen(true)}>
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
                        lobbies.map((item, idx)=> ( 
                            <ListItem key={idx}>
                                <ListItemButton onClick={()=> handleSelection(item)}>
                                    <Typography>
                                        {item}
                                    </Typography>
                                </ListItemButton>
                            </ListItem>
                         ))
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