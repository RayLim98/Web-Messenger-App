import { Box, Container} from '@mui/material'
import { useState, useEffect } from 'react'
import { useUserModal } from '.'
import MyDropzone from '../imageDrop'
import CropImage from '../cropper'
import StyledDp from '../styledComponents/styledDisplayPhoto'
import ModalWrapper from '../styledComponents/modalWrapper'
import ModalButton from '../styledComponents/modalButton'
import ModalHeader from '../styledComponents/modalHeader'


const MainModal = () => {
    const {setSelection, image: currentImage, handleClose} = useUserModal()

    return (
        <ModalWrapper>
            <ModalHeader title={'Profile Photo'} onClick={()=> handleClose()}/>
            <Box sx={{
                display: 'flex',
                flex: 8,
                justifyContent:'center',
                alignItems:'center',
            }}>
                { currentImage.croppedURLString && <StyledDp src={currentImage.croppedURLString}/> }
                { !currentImage.croppedURLString && <text> no image... </text> }
            </Box>
            <Box sx={{
                display: 'flex',
                width: '100%',
            }}>
                <ModalButton onClick={()=> setSelection('Upload Photo')} value={'Upload'}/>
            </Box>
        </ModalWrapper>
    ) 

}

const CropModal = () => {
    const { setImage, setSelection, image: currentImage, handleClose} = useUserModal()
    const [url, setUrl] = useState(null)

    useEffect(() => {
        if(url) {
            setImage({
                ...currentImage,
                croppedURLString: url
            })
            setSelection('Profile Photo')
        }
    }, [url])

    return (
        <ModalWrapper>
            <ModalHeader title={'Crop Photo'} onClick={()=> handleClose()}/>
            <CropImage 
                image={URL.createObjectURL(currentImage.original)} 
                setCroppedImage={setUrl}
            />
        </ModalWrapper>
    ) 

}

const UploadModal = () => {
    const { setImage, setSelection, handleClose } = useUserModal()
    const [file, setFile] = useState(undefined);
    useEffect(() => {
        if(file) {
            setImage({
                original: file,
                croppedURLString: null
            })
            setSelection('Edit Photo')
        }
    }, [file])
    

    return (
        <ModalWrapper>
            <ModalHeader title={'Upload Photo'} onClick={()=> handleClose()}/>
            <Container sx={{
                display: 'flex',
                flex: 1,
                width: '100%',
                height: '200px',
                marginBottom: '10px',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <MyDropzone currentImage = {null} setImage={setFile}/>
            </Container>
        </ModalWrapper>
    )
}

export {
    MainModal,
    UploadModal,
    CropModal
}
