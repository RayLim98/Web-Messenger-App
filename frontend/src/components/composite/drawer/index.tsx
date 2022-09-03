import { 
    Drawer, 
    Typography, 
    ListItem, 
    List, 
    ListItemButton, 
    Divider, 
    ListItemText, 
} from '@mui/material'
import {useState} from 'react'
// Icons
import LogoutIcon from '@mui/icons-material/Logout';
import AddIcon from '@mui/icons-material/Add';
// Hooks
import { useComm } from '../../../context/commProvider';
import { useAuth } from '../../../context/authProvider';
import { useNavigate } from 'react-router-dom';
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
    const { joinLobby } = useComm()

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
                    <ListItemText>
                        {user?.userName}
                    </ListItemText>
                </ListItem>
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
                                        {item.title}
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