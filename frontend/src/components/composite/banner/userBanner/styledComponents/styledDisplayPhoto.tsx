import { styled } from '@mui/material'

const ImageWrapper = styled('div')`
  width: 20rem ;
  aspect-ratio: 1;
  border-radius: 25rem;
`
export const StyledImage = styled('img')`
  width: 100%;
  height: 100%;
  border-radius: inherit;
`
const StyledDp = ({src}: {src: any}) => {
  return (
    <ImageWrapper>
        <StyledImage src={src}/>
    </ImageWrapper>
  )
}

export default StyledDp
