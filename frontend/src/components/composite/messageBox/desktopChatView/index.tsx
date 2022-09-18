import React, { useState } from 'react'
import { Box } from '@mui/material'
import MessageI from '../../../../interface/MessageI'
import LobbyI from '../../../../interface/LobbyI'
import { useComm } from '../../../../context/commProvider'
import LeftView from './leftView'
import RightView from './rightRight'
import CreateLobbyModal from '../../modals/createLobbyModal'
import DeleteLobbyModal from '../../modals/deleteLobbyModal'

interface DesktopChatViewProps {
  lobbyTitle: string
  lobbyList: LobbyI[]
  userName: string
  inputValue: string
  messageList: MessageI[]
  setInputValue: (value: string) => void
  submitMessage: () => void
}

const DesktopChatView = ({
  lobbyList,
  userName, 
  inputValue, 
  messageList, 
  setInputValue, 
  submitMessage
}: DesktopChatViewProps) => {
  const [createModal, setCreateModal] = useState<boolean>(false)
  const [deleteModal, setDeleteModal] = useState<boolean>(false)
  const [selection, setSelection] = useState<LobbyI>(lobbyList[0])

  const { joinLobby } = useComm()

  const onSelect = (selection: LobbyI)=> joinLobby(selection)
  const onCreate = () => setCreateModal(true)
  const onDelete = (selection: LobbyI) => {
    setSelection(selection)
    setDeleteModal(true)
  }


  return (
    <Box 
      display={"flex"}
      height={"100%"}
    >
      <CreateLobbyModal 
          open={createModal}
          onClose={setCreateModal} 
      />
      <DeleteLobbyModal
        open={deleteModal}
        onClose={setDeleteModal}
        selection={selection}
      />
      <LeftView
        lobbyList={lobbyList}
        onCreate={onCreate}
        onSelect={onSelect}
        onDelete={onDelete}
      />
      <RightView
        messageList={messageList}
        value={inputValue}
        userName={userName}
        onSubmit={submitMessage}
        onChange={(e) => setInputValue(e.target.value)}
      />
    </Box>
  )
}

export default DesktopChatView