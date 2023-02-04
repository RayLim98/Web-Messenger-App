import { TextField, styled } from '@mui/material'

interface Props {
    active: boolean
}

export const StyledInput = styled(TextField)`
    width: '100%';
    display:${({active}: Props)=> active ? 'block': 'none'} ;
    border-bottom: 1px solid #67EBFF ;
    & .MuiInputBase-input::placeholder {
        color: #67EBFF;
    }
`