import React from 'react'
import {Button, Typography} from '@mui/material'

interface Props {
    children: React.ReactNode
    onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

const MuiPrimButton = ({onClick, children}: Props) => {
  return (
    <Button
        onClick={onClick}
        sx={{
            borderRadius: "4rem"
        }}
    >
        <Typography color={"text.primary"}>
            {children}
        </Typography>
    </Button>
  )
}

export default MuiPrimButton
