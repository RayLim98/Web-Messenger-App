import { Button, styled } from '@mui/material'

const StyledButton = styled(Button)`
    margin: 10px;
    width: 100%;
    color: white;
    :hover {
        color: black;
        background-color: #72899F;
    }
`
const ModalButton = ({value, onClick, sx}: {value:any, onClick: ()=> void, sx?: any}) => {
  return (
    <StyledButton onClick={onClick} sx={sx}>
        {value}
    </StyledButton>
  )
}

export default ModalButton
