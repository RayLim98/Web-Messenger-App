import { IconButton, ListItem, ListItemButton, ListItemText, styled } from '@mui/material'
import React, { ReactNode } from 'react'
import CloseIcon from '@mui/icons-material/Close';

const StyledListItem = styled(ListItem)(({theme})=> ({
  '& .MuiTypography-root': {
    color: theme.palette.text.secondary,
  }
}))

interface Props {
  children: ReactNode
  onDelete: ()=> void
  onSelect: ()=> void
}

const MuiListItem = ({
  children,
  onDelete,
  onSelect,
}: Props) => {
  return (
    <StyledListItem
      disableGutters
      disablePadding
      secondaryAction={
        <IconButton onClick={onDelete}>
          <CloseIcon
            sx={{
              color: "text.secondary"
            }}
          />
        </IconButton>
      }
    >
      <ListItemButton
        onClick={onSelect}
      >
        <ListItemText
        >
          {children}
        </ListItemText>
      </ListItemButton>
    </StyledListItem>
  )
}

export default MuiListItem