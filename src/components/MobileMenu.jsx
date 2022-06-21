import { Link } from "react-router-dom";

import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";

import LoginIcon from "@mui/icons-material/Login";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import InsertLinkIcon from "@mui/icons-material/InsertLink";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import { useAuth } from "../context/AuthContext";

const MobileMenu = ({ menuOpen, setMenuOpen }) => {
  const { user } = useAuth();

  const items = [
    { icon: <LoginIcon />, text: "Login", url: "/login" },
    { icon: <PersonAddAltIcon />, text: "Register", url: "/register" },
  ];

  const protectedItems = [
    { icon: <InsertLinkIcon />, text: "My Links", url: "/dashboard" },
    { icon: <AccountCircleIcon />, text: "Profile", url: "/profile" },
    { icon: <SettingsIcon />, text: "Settings", url: "/settings" },
  ];

  return (
    <Drawer anchor="right" open={menuOpen} onClose={() => setMenuOpen(false)}>
      <Box p={2} width="250px" textAlign="center">
        <List>
          {user ? (
            <>
              {protectedItems.map((item) => (
                <ListItem disablePadding key={item.url}>
                  <ListItemButton
                    component={Link}
                    to={item.url}
                    onClick={() => setMenuOpen(false)}
                  >
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItemButton>
                </ListItem>
              ))}
              <Divider />

              <ListItem disablePadding>
                <ListItemButton onClick={() => setMenuOpen(false)}>
                  <ListItemIcon>
                    <LogoutIcon />
                  </ListItemIcon>
                  <ListItemText primary="Logout" />
                </ListItemButton>
              </ListItem>
            </>
          ) : (
            items.map((item) => (
              <ListItem disablePadding key={item.url}>
                <ListItemButton
                  component={Link}
                  to={item.url}
                  onClick={() => setMenuOpen(false)}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))
          )}
        </List>
      </Box>
    </Drawer>
  );
};

export default MobileMenu;
