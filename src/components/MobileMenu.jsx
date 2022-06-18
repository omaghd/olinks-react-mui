import { Link } from "react-router-dom";

import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Drawer from "@mui/material/Drawer";

import LoginIcon from "@mui/icons-material/Login";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";

const MobileMenu = ({ menuOpen, setMenuOpen }) => {
  const items = [
    { icon: <LoginIcon />, text: "Login", url: "/login" },
    { icon: <PersonAddAltIcon />, text: "Register", url: "/register" },
  ];

  return (
    <Drawer anchor="right" open={menuOpen} onClose={() => setMenuOpen(false)}>
      <Box p={2} width="250px" textAlign="center">
        <List>
          {items &&
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
            ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default MobileMenu;
