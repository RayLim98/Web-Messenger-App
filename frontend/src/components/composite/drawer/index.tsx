import { 
    Drawer, 
    Typography, 
    ListItem, 
    List, 
    ListItemButton, 
    Divider, 
    ListItemText, 
} from '@mui/material'
import {useEffect, useState} from 'react'
// Icons
import LogoutIcon from '@mui/icons-material/Logout';
import AddIcon from '@mui/icons-material/Add';
// Hooks
import { useComm } from '../../../context/commProvider';
import { useAuth } from '../../../context/authProvider';
import UserBanner from '../banner/userBanner'
import CreateLobbyModal from '../modals/createLobbyModal';
//interfaces
import LobbyI from '../../../interface/LobbyI';
import { ObjectID } from 'bson';

const lobbies: LobbyI[]= [
  {
    id: new ObjectID("6312cee1322f306b8f1d1720").toString(),
    title: "MyLobby",
    author: "raymodnlim",
    image: ""
  },
  {
    id: new ObjectID("6312ce58c6a43a065e6d0776").toString(),
    title: "Public",
    author: "raymondlim",
    image: ""
  }
]

interface Props {
    open: boolean
    setOpen: (value:boolean) => void
}

const MainDrawer = ({open, setOpen}: Props) => {
    const [modalOpen, setModalOpen] = useState(false)
    const {user, logout} = useAuth()
    const { joinLobby, lobbyList } = useComm()

    const handleSelection = (selection: LobbyI) => {
        joinLobby(selection)
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
                    <ListItemText 
                        primaryTypographyProps={{
                            color:"text.secondary"
                        }}
                    >
                        {user?.userName}
                    </ListItemText>
                </ListItem>
                <ListItem>
                    <UserBanner userImage={user?.image} size={7}/>
                </ListItem>
                <Divider/>
                <ListItem>
                    <ListItemButton onClick={()=> setModalOpen(true)}>
                        <ListItemText
                            primaryTypographyProps={{
                                color:"text.secondary"
                            }}
                        >
                            Add Server
                        </ListItemText>
                        <AddIcon 
                            sx={{
                                color:"text.secondary"
                            }}
                        />
                    </ListItemButton>
                </ListItem>
                <List 
                    sx={{
                        overflow: "scroll"
                    }}
                >
                    {
                        lobbyList.map((item, idx)=> ( 
                            <ListItem key={idx}>
                                <ListItemButton onClick={()=> handleSelection(item)}>
                                    <ListItemText
                                        primaryTypographyProps={{
                                            color:"text.secondary"
                                        }}
                                    >
                                        {item.title}
                                    </ListItemText>
                                </ListItemButton>
                            </ListItem>
                         ))
                    }
                </List>
                <Divider/>
                <ListItem>
                    <ListItemButton onClick={()=> logout()}>
                        <ListItemText 
                            primaryTypographyProps={{
                                color:"text.secondary"
                            }}
                        >
                            Logout
                        </ListItemText>
                        <LogoutIcon
                            sx={{
                                color:"text.secondary"
                            }}
                        />
                    </ListItemButton>
                </ListItem>
            </List>
        </Drawer>
    )
}

export default MainDrawer