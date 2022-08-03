import { createContext, useContext } from 'react'
import { useState } from 'react'
import { Dialog } from '@mui/material'
import { CropModal, MainModal, UploadModal} from './viewModals'
import { UserModalProps, Selection, PhotoProps } from '../interfaces'

const UserContext = createContext<any>({})

const UserModal = ({onClose, open, currentImage}: UserModalProps) => {
    const [image, setImage] = useState<PhotoProps>(currentImage);
    const [selection, setSelection] = useState<Selection>('Profile Photo')

    const handleClose = () => {
        if(selection == 'Profile Photo') onClose(image)
        else setSelection('Profile Photo')
    }

    const renderContent = () => {
        if(selection == 'Profile Photo')
            return <MainModal/> 
        else if(selection == 'Upload Photo') 
            return <UploadModal/>
        else 
            return <CropModal/>
    }

    return (
        <Dialog 
            open={open} 
            onClose={handleClose} 
            fullWidth={true}
            maxWidth='sm'
        >
            <UserContext.Provider value = {{
                image,
                handleClose,
                setImage,
                setSelection
            }}>
                {renderContent()}
            </UserContext.Provider>
        </Dialog>
    )
}

/**
 * @description Modal hook for userModal. All params are accessible 
 * @param image
 * @param handleClose
 * @param setImage
 * @param setSelection
 */
const useUserModal = () => {
    const user = useContext(UserContext);
    if(user == null) {
        throw new Error("useUserModal is called outside of a provider?");
    }
    return user
}

export {
    UserModal, 
    useUserModal 
};