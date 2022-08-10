import React from 'react'
import { styled } from '@mui/material'

const StyledBg = styled('div')`
    display: flex;
    flex: 1;
    height: 100vh;
    padding: 2rem;
    justify-content: center;
    background-color: ${({theme})=> theme.palette.primary.main};
    box-sizing: border-box;
`

const BgWrapper = ({children}: {children: React.ReactNode}) => {
  return (
    <StyledBg>
      {children}
    </StyledBg>
  )
}

export default BgWrapper
