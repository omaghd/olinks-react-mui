import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

import { useState } from "react";
import { useAuth } from "../context/AuthContext";

import { Link } from "react-router-dom";

const userItems = [
  { name: "Profile", link: "/profile" },
  { name: "Settings", link: "/settings" },
];

const UserMenu = () => {
  const [anchorElUser, setAnchorElUser] = useState(null);

  const { user, logout } = useAuth();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box sx={{ flexGrow: 0 }}>
      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
        <Avatar
          alt={user.displayName}
          src={user.photoURL}
          sx={{
            width: { xs: 30, sm: 45 },
            height: { xs: 30, sm: 45 },
          }}
        />
      </IconButton>
      <Menu
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {userItems.map((item) => (
          <MenuItem
            key={item.link}
            component={Link}
            to={item.link}
            onClick={handleCloseUserMenu}
          >
            <Typography textAlign="center">{item.name}</Typography>
          </MenuItem>
        ))}
        <Divider />
        <MenuItem onClick={logout}>
          <Typography textAlign="center">Logout</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default UserMenu;
