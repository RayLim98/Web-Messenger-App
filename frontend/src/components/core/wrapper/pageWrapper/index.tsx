import { flexbox } from '@mui/system'
import { styled } from '@mui/material'
import React from 'react'
import styles from './style.module.css'

const StyledPage = styled('div')(({theme}) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '20px',
  paddingLeft: '4rem',
  paddingRight: '4rem',
  width: '100%',
  backgroundColor: theme.palette.primary.main
}))

const PageWrapper = ({children}: {children: React.ReactNode}) => {
  return (
    <StyledPage>
      {children}
    </StyledPage>
  )
}

export default PageWrapper
 