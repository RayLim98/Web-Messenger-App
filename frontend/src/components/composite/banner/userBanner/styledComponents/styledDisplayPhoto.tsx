import { styled } from '@mui/material'

const ImageWrapper = styled('div')`
  background-color: white;
  width: 20rem ;
  aspect-ratio: 1;
`
const StyledImage = styled('img')`
  width: 100%;
  height: 100%;
  border-radius: 25rem;
`
const StyledDp = ({src}: {src: any}) => {
  return (
    <ImageWrapper>
        <StyledImage src={src}/>
    </ImageWrapper>
  )
}

export default StyledDp
