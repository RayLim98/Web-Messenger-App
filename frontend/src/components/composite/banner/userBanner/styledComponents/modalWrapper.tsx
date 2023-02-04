import { styled, Container, Box } from '@mui/material'
import { Theme } from '@mui/system'

interface Props {
    theme: Theme
    bgColor?: string
}

const ModalWrapper = styled(Box)(({theme, bgColor}: Props) => ({
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: bgColor || theme.palette.primary.dark,
    width: '100%',
    minHeight: '35vh',
    maxHeight: '500px',
})) 

export default ModalWrapper
