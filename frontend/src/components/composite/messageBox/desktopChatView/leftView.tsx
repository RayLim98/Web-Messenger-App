import React from 'react'
import { Stack, Button, Typography, List } from '@mui/material'
import UserBanner from '../../banner/userBanner'
import LobbyI from '../../../../interface/LobbyI'
import MuiListButtonItem from '../../../core/listItem-mui/muiListButtonItem'

interface Props {
  lobbyList: LobbyI[]
  onCreate: ()=> void
  onSelect: (selection: LobbyI)=> void
  onDelete: (selection: LobbyI)=> void
}
const LeftView = ({ lobbyList, onSelect, onCreate, onDelete }: Props) => {
  return (
      <Stack 
        flex={1}
        alignItems={"stretch"}
        sx={{
          borderRight: "1px solid grey",
        }}
      >
        <Stack alignSelf={"center"}>
          <UserBanner userImage={null} size={10}/>
        </Stack >
        <Stack alignItems={"stretch"}>
          <Button onClick={()=> onCreate()}>
              <Typography color={"secondary"}>
                add server
              </Typography>
          </Button>
          <List>
            {
              lobbyList.map((item,idx)=> (
                <MuiListButtonItem
                  onSelect={()=> onSelect(item)}
                  onDelete={()=> onDelete(item)}
                >
                    {item.title}
                </MuiListButtonItem>
              ))
            }
          </List>
        </Stack>
      </Stack>
  )
}

export default LeftView