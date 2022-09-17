import { useState } from 'react'
import { Stack ,Button,Dialog, TextField, Typography } from '@mui/material'
import { useAuth } from '../../../context/authProvider'
import { useComm } from '../../../context/commProvider'
import LobbyI from '../../../interface/LobbyI'

interface Props {
    open: boolean
    onClose: (val: boolean)=> void
    selection: LobbyI
}

const DeleteLobbyModal = ({open, onClose, selection}: Props) => {
    const [name, setName] = useState("")
    const {user} = useAuth()
    const { deleteLobby } = useComm()

    const handleClose = () => {
        onClose(false)
    }

    const handleSubmit = async () => {
        deleteLobby(selection)
        onClose(false)
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            sx={{
                '& .MuiPaper-root': {
                    backgroundColor: 'background.default'
                }
            }}
        >
            <Stack sx={{padding: "1rem", pr: "2rem", pl: "2rem"}}>
                <Typography variant='h6' sx={{mb: "0.5rem"}} color={"text.secondary"}>
                    Delete Lobby
                </Typography>
                <Typography variant='h6' sx={{mb: "0.5rem"}} color={"text.secondary"}>
                    {selection.title}
                </Typography>
                <Button onClick={handleSubmit}>
                    <Typography variant='h6' color={"text.primary"}>
                        Yes
                    </Typography>
                </Button>
                <Button onClick={handleClose}>
                    <Typography variant='h6' color={"text.primary"}>
                        No
                    </Typography>
                </Button>
            </Stack>
        </Dialog>
    )
}

export default DeleteLobbyModal
