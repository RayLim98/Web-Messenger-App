import React from 'react'
import MobileChatView from '../components/composite/messageBox/mobileChatView'
import MobileHeader from '../components/composite/headers/mobileHeader';
import { useAuth } from '../context/authProvider';
import { useComm } from '../context/commProvider';

const Lobby = () => {
  const { user } = useAuth();
  const { currentLobby} = useComm();
  return (
      <MobileChatView 
          lobbyId={currentLobby}
          userName={user?.userName}
      /> 
  )
}

export default Lobby