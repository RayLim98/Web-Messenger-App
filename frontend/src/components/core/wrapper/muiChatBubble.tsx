import { Box, Theme, Typography } from '@mui/material'
import { styled } from '@mui/system'
import React from 'react'

interface Props {
  children: React.ReactNode
  ownsMessage: boolean
  theme?: Theme
}

const StyledText = styled(Typography)(({theme})=>({
  color: theme.palette.text.primary,
  textAlign: 'justify'
}))

const StyledWrapper = styled(Box)<Props>(({theme, ownsMessage})=> ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: ownsMessage? '10px 10px 0px 10px': '10px 10px 10px 0px',
  alignSelf: ownsMessage? 'flex-end': 'flex-start',
  maxWidth: '80%',
  margin: '0.2rem',
  marginRight: '0.5rem',
  marginLeft: '0.5rem',
  padding: '1rem',
}))

const MuiChatBubble = ({children, ownsMessage}: Props) => {
  return (
    <StyledWrapper ownsMessage={ownsMessage}>
      <StyledText variant={'body1'}>
        {children}
      </StyledText>
    </StyledWrapper>

  )
}

export default MuiChatBubble
