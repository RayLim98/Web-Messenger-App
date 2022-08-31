import { useEffect, useState } from 'react'
import { PhotoProps } from './interfaces'
import { UserModal } from './userModals'

import StyledDp from './styledComponents/styledDisplayPhoto'
import PhotoWrapper from './styledComponents/photoWrapper'
import emptyAvatar from './isEmptyDisplay.png'


interface Props {
    userImage: null | string
    size?: number
}

const UserBanner = ({userImage, size}: Props) => {
    const [model, setModel] = useState<boolean>(false)
    const [image, setImage] = useState<PhotoProps>({
        original: null,
        croppedURLString: userImage || null
    })

    // useEffect(() => {
    //     // Base64 conversion example 
    // }, [image])

    
    const handleImageClick = () => setModel(true) 

    const handleUploadClose = (image:any) => {
        setImage(image);
        setModel(false);
    }

    return (
        <div>
            <PhotoWrapper onClick={handleImageClick} size={size}>
                {image.croppedURLString && <StyledDp src = {image.croppedURLString}/>}
                {!image.croppedURLString && <StyledDp src = {emptyAvatar}/>}
            </PhotoWrapper>
            <UserModal 
                open={model} 
                onClose={handleUploadClose} 
                currentImage={image}
            />
        </div>
    )
}

export default UserBanner
