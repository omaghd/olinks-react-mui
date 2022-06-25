import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import LinkIcon from "@mui/icons-material/Link";

import { useAuth } from "../context/AuthContext";

import { Link } from "react-router-dom";

const userItems = [
  { icon: <LinkIcon />, name: "Links", link: "/dashboard" },
  { icon: <AccountCircleIcon />, name: "Profile", link: "/profile" },
  { icon: <SettingsIcon />, name: "Settings", link: "/settings" },
];

const MobileSidebar = ({ openSidebar, setOpenSidebar }) => {
  const { logout } = useAuth();

  return (
    <Drawer
      anchor="left"
      open={openSidebar}
      onClose={() => setOpenSidebar(false)}
    >
      <List>
        {userItems.map((item) => (
          <ListItem key={item.name} disablePadding>
            <ListItemButton
              component={Link}
              to={item.link}
              onClick={() => setOpenSidebar(false)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={logout}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default MobileSidebar;
