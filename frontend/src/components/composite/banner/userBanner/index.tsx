import { useEffect, useState } from 'react'
import { PhotoProps } from './interfaces'

import { UserModal } from './userModals'
import StyledDp from './styledComponents/styledDisplayPhoto'
import PhotoWrapper from './styledComponents/photoWrapper'
import getBase64FromUrl from './getBase64'

const UserBanner = () => {
    const [image, setImage] = useState<PhotoProps>({
        original: null,
        croppedURLString: null
    })

    useEffect(() => {
        // Base64 conversion example 
        if(image.croppedURLString) {
            const getBase64 = async () => {
                const base64 = await getBase64FromUrl(image.croppedURLString)
                console.log('>.............BASE64 output: ', base64)
            }
            getBase64()
        }
    }, [image])

    const [model, setModel] = useState<boolean>(false)
    
    const handleImageClick = () => setModel(true) 

    const handleUploadClose = (image:any) => {
        setImage(image);
        setModel(false);
    }

    return (
        <div>
            <PhotoWrapper onClick={handleImageClick}>
                <StyledDp src = {image.croppedURLString}/>
            </PhotoWrapper>
            <UserModal open={model} onClose={handleUploadClose} currentImage={image}/>
        </div>
    )
}

export default UserBanner