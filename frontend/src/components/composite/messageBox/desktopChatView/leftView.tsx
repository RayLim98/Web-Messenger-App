import LogoutIcon from "@mui/icons-material/Logout";
import {
  Stack,
  Button,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import UserBanner from "../../banner/userBanner";
import LobbyI from "../../../../interface/LobbyI";
import MuiListButtonItem from "../../../core/listItem-mui/muiListButtonItem";
import { useAuth } from "../../../../context/authProvider";

interface Props {
  lobbyList: LobbyI[];
  onCreate: () => void;
  onSelect: (selection: LobbyI) => void;
  onDelete: (selection: LobbyI) => void;
}

const LeftView = ({ lobbyList, onSelect, onCreate, onDelete }: Props) => {
  const { logout } = useAuth();
  return (
    <Stack
      flex={1}
      alignItems={"stretch"}
      sx={{
        borderRight: "1px solid grey",
      }}
    >
      <Stack alignSelf={"center"}>
        <UserBanner userImage={null} size={10} />
      </Stack>
      <Stack alignItems={"stretch"}>
        <Button onClick={() => onCreate()}>
          <Typography color={"secondary"}>add server</Typography>
        </Button>
        <List>
          <>
            {lobbyList.map((item, idx) => (
              <MuiListButtonItem
                onSelect={() => onSelect(item)}
                onDelete={() => onDelete(item)}
              >
                {item.title}
              </MuiListButtonItem>
            ))}

            <ListItem>
              <ListItemButton onClick={() => logout()}>
                <ListItemText
                  primaryTypographyProps={{
                    color: "text.secondary",
                  }}
                >
                  Logout
                </ListItemText>
                <LogoutIcon
                  sx={{
                    color: "text.secondary",
                  }}
                />
              </ListItemButton>
            </ListItem>
          </>
        </List>
      </Stack>
    </Stack>
  );
};

export default LeftView;
