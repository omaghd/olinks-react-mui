import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";

import MenuIcon from "@mui/icons-material/Menu";

import { Link } from "react-router-dom";

import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import MobileSidebar from "./MobileSidebar";

const userItems = [
  { name: "Profile", link: "/profile" },
  { name: "Settings", link: "/settings" },
];

const Navbar = () => {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const { user, logout } = useAuth();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <MobileSidebar
        openSidebar={openSidebar}
        setOpenSidebar={setOpenSidebar}
      />

      <AppBar position="static">
        <Toolbar>
          {user && (
            <IconButton
              onClick={() => setOpenSidebar(true)}
              color="inherit"
              sx={{ display: { xs: "block", sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography
            fontWeight={300}
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, userSelect: "none" }}
          >
            OLinks
          </Typography>
          <Stack direction="row" spacing={1}>
            {user ? (
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
                    <MenuItem key={item.link} component={Link} to={item.link}>
                      <Typography textAlign="center">{item.name}</Typography>
                    </MenuItem>
                  ))}
                  <Divider />
                  <MenuItem onClick={logout}>
                    <Typography textAlign="center">Logout</Typography>
                  </MenuItem>
                </Menu>
              </Box>
            ) : (
              <>
                <Button
                  component={Link}
                  variant="outlined"
                  color="inherit"
                  to="/login"
                >
                  Login
                </Button>
                <Button component={Link} color="inherit" to="/register">
                  Register
                </Button>
              </>
            )}
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
