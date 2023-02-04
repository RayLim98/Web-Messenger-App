import React from 'react'
import { TextField, TextFieldProps } from '@mui/material'

interface Props {
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

const MuiPrimTextField = ({value, onChange}: Props) => (
  <TextField
    fullWidth={true}
    value={value}
    onChange={onChange}
    sx={{
      borderRadius: "4rem",
      backgroundColor: "inputField.main",
      "& .MuiOutlinedInput-notchedOutline": {
        border: "unset"
      }
    }} />
)

export default MuiPrimTextField