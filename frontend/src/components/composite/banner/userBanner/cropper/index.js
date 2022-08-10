import { useState, useCallback} from 'react'
import { styled, Slider, Typography, Button } from '@mui/material'
import { Container } from '@mui/system'
import Cropper from 'react-easy-crop'
import getCroppedImg from './genCroppedImage'

const CropWrapper = styled(Container)`
    display: flex;
    flex-direction: column;
    flex:1;
    width: 100%;
    min-height: 24rem;
    margin-bottom: 10px;
`

const PictureWrapper = styled(Container)`
    display: flex;
    position: relative;
    flex:5;
`
const ControlWrapper = styled(Container)`
  display: flex;
  @media screen and (max-width: 600px){
    flex-direction: column;
  }
`

const SliderWrapper = styled('div')`
  display: flex;
  flex-direction: row;
  flex: 1;
  align-items: center;
  justify-content: center;
`

const StyledSlider = styled(Slider)(({theme})=>({
  marginRight: '1rem',
  marginLeft: '1rem',
  color: theme.palette.primary.contrastText,
}))


const CropImage = ({image, setCroppedImage}) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [rotation, setRotation] = useState(0)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)

  const onCropComplete = useCallback(async (croppedArea, croppedAreaPixels) => {
    console.log(croppedArea, croppedAreaPixels);
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  const onConfirm = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(
        image,
        croppedAreaPixels,
        rotation
      )
      setCroppedImage(croppedImage)
    } catch (e) {
      console.error(e)
    }
  }, [croppedAreaPixels, rotation])

  return (
    <CropWrapper>
      <PictureWrapper>
        <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            rotation={rotation}
            aspect={4/4}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
            onRotationChange={setRotation}
            cropShape='round'
          />
      </PictureWrapper>
      <ControlWrapper>
        <SliderWrapper>
          <Typography color={'white'}>
            Zoom
          </Typography>
          <StyledSlider
              value={zoom}
              min={1}
              max={3}
              step={0.1}
              aria-labelledby="Zoom"
              onChange={(e, zoom) => setZoom(zoom)}
          />
        </SliderWrapper>
        <SliderWrapper>
          <Typography color={'primary.text'}>
            Rotate
          </Typography>
          <StyledSlider
              value={rotation}
              min={0}
              max={360}
              step={1}
              aria-labelledby="Rotation"
              onChange={(e, rotation) => setRotation(rotation)}
          />
        </SliderWrapper>
      </ControlWrapper>  
      <Button 
          onClick={onConfirm}
          sx={{
              marginBottom: '10px',
              width: '100%',
              color: 'white',
              '&:hover': {
                  backgroundColor: '#72899F',
                  color: 'black',
              }
          }}
      >
              Upload
      </Button>
    </CropWrapper>
  )
}

export default CropImage