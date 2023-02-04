import { Box, Button, Stack, styled, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import ModalButton from './modalButton';

interface Props {
    onClick: ()=> void
    title: string
}

const ModalHeader = ({onClick, title}: Props) => {
  return (
    <Stack 
        boxSizing={'border-box'}
        paddingLeft={'1rem'}
        direction={'row'}
        width={'100%'}
        justifyContent={'space-between'}
        alignItems={'center'}
    >
        <Typography color={'white'} variant={'h4'}>{title}</Typography>
        <ModalButton
            sx={{
                width: 'unset'
            }}
            onClick={onClick}
            value={
                <CloseIcon
                    sx={{
                        color: 'white'
                    }}
                />
            }
        />
    </Stack>
  )
}

export default ModalHeader
