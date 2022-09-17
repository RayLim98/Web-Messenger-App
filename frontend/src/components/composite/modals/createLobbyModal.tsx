import { Stack ,Button,Dialog, TextField, Typography } from '@mui/material'
import { ObjectID } from 'bson'
import React, {useState} from 'react'
import createLobbyApi_ from '../../../api/lobbyAPI/createlobby'
import updateUserApi from '../../../api/updateUser'
import { useAuth } from '../../../context/authProvider'
import { useComm } from '../../../context/commProvider'
import LobbyI from '../../../interface/LobbyI'

interface Props {
    open: boolean
    onClose: (val: boolean)=> void
}

const CreateLobbyModal = ({open, onClose}: Props) => {
    const [name, setName] = useState("")
    const {user} = useAuth()
    const { createLobby } = useComm()

    const handleClose = () => {
        onClose(false)
    }

    const handleSubmit = async () => {
        if(name !== "") {
            try {
                const newLobby: LobbyI = {
                    id: new ObjectID().toString(),
                    title: name,
                    author: user.userName,
                } 

                // Create and update lobby in datebase and local 
                createLobby(newLobby)

                // Close on finish
                handleClose()
            } catch(e){
                console.log("failed to create lobby", e)
            }
        } else {
                console.log("Field is empty.")
        }
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
        >
            <Stack sx={{padding: "1rem", pr: "2rem", pl: "2rem"}}>
                <Typography variant='h6' sx={{mb: "0.5rem"}} color={"text.secondary"}>
                    Create a new lobby
                </Typography>
                <TextField
                    value={name}
                    onChange={(e)=> setName(e.target.value)}
                />
                <Button onClick={handleSubmit}>
                    <Typography variant='h6' color={"text.primary"}>
                        Create
                    </Typography>
                </Button>
            </Stack>
        </Dialog>
    )
}

export default CreateLobbyModal