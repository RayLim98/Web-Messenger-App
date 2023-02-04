import { 
    Drawer, 
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
// Components
import UserBanner from '../banner/userBanner'
import CreateLobbyModal from '../modals/createLobbyModal';
import MuiListButtonItem from '../../core/listItem-mui/muiListButtonItem';
import DeleteLobbyModal from '../../composite/modals/deleteLobbyModal';
//interfaces
import LobbyI from '../../../interface/LobbyI';

interface Props {
    open: boolean
    setOpen: (value:boolean) => void
}

const MobileDrawer = ({open, setOpen}: Props) => {
    const {user, logout} = useAuth()
    const { joinLobby, lobbyList } = useComm()
    const [createModal, setCreateModal] = useState(false)
    const [deleteModal, setDeleteModel] = useState(false)
    const [selection, setSelection] = useState<LobbyI>(lobbyList[0]);

    const handleSelection = (selection: LobbyI) => {
        joinLobby(selection)
        setOpen(false)
    }

    const handleDelete = (selection: LobbyI) => {
        setSelection(selection)
        setDeleteModel(true)
    }

    return (
        <Drawer 
            anchor={"left"} 
            open={open}
            onClose={()=> setOpen(false)}
            sx={{
                "& .MuiPaper-root": {
                    backgroundColor: "background.default"
                }
            }}
        >
            <CreateLobbyModal 
                open={createModal}
                onClose={setCreateModal} 
            />
            <DeleteLobbyModal
                open={deleteModal}
                onClose={setDeleteModel} 
                selection={selection}
            />
            <List disablePadding>
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
                    <ListItemButton onClick={()=> setCreateModal(true)}>
                        <ListItemText sx={{color: 'text.secondary'}}>
                            Add Server
                        </ListItemText>
                        <AddIcon sx={{ color:"text.secondary" }}/>
                    </ListItemButton>
                </ListItem>
                <Divider/>
                <List sx={{ overflow: "scroll" }}>
                    {
                        lobbyList.map((item, idx)=> ( 
                            <MuiListButtonItem 
                                key={idx}
                                onSelect={()=> handleSelection(item)}
                                onDelete={()=> handleDelete(item)}
                            >
                                {item.title}
                            </MuiListButtonItem>
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

export default MobileDrawer