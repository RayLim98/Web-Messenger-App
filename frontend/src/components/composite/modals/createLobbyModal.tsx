import { Stack ,Button,Dialog, TextField, Typography } from '@mui/material'
import React, {useState} from 'react'
import createLobby from '../../../api/lobbyAPI/createlobby'
import updateUser from '../../../api/updateUser'
import { useAuth } from '../../../context/authProvider'

interface Props {
    open: boolean
    onClose: (val: boolean)=> void
}

const CreateLobbyModal = ({open, onClose}: Props) => {
    const [name, setName] = useState("")
    const {user} = useAuth()
    const handleClose = () => {
        onClose(false)
    }

    const handleSubmit = async () => {
        if(name !== "") {
            try {
                // Create lobby
                const res = await createLobby({ name: name, }, user.token).then()
                // use Response with new lobby data and update it to user data
                const prevDoc = await updateUser({ lobbyId: res.data._id }, user.token)
                console.log("Updated document: ", prevDoc)
                // Close on finish
                handleClose()
            } catch(e){
                console.log("failed to create lobby", e)
            }
        } else {
                console.log("Field is emptyk")
        }
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
        >
            <Stack sx={{padding: "1rem", pr: "2rem", pl: "2rem"}}>
                <Typography variant='h6' sx={{mb: "0.5rem"}}>
                    Creater a new server
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