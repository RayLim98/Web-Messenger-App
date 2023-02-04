import axios from "axios";
import LobbyI from "../interface/LobbyI";
import api from "./api";

interface Props {
  userName?: string;
  image?: string;
  lobbies?: LobbyI[];
}

const updateUserApi_ = async ({ lobbies }: Props, token: string) => {
  const lobbyIds = lobbies?.map((lobby) => lobby._id);
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return api.put(
    "/api/user/update",
    {
      lobbies: JSON.stringify(lobbyIds),
    },
    config
  );
};

export default updateUserApi_;
