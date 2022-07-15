import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";

import MenuIcon from "@mui/icons-material/Menu";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useMode } from "../context/ModeContext";

import { MenuContextProvider } from "../context/MenuContext";

import MobileSidebar from "./MobileSidebar";
import Menu from "./Menu";
import UserMenu from "./UserMenu";
import VisitorMenu from "./VisitorMenu";

const Navbar = () => {
  const [openSidebar, setOpenSidebar] = useState(false);

  const { user, profile } = useAuth();

  const { mode, toggleMode } = useMode();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <MobileSidebar
        openSidebar={openSidebar}
        setOpenSidebar={setOpenSidebar}
      />

      <AppBar position="relative">
        <Toolbar>
          {user && (
            <IconButton
              onClick={() => setOpenSidebar(true)}
              color="inherit"
              sx={{ display: { xs: "flex", sm: "none" } }}
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

          <Stack direction="row" spacing={2} alignItems="center">
            <MenuContextProvider>
              <Menu
                altAvatar={user ? profile?.username : ""}
                srcAvatar={user ? profile?.photoURL : ""}
              >
                {user ? <UserMenu /> : <VisitorMenu />}
              </Menu>
            </MenuContextProvider>
            <IconButton onClick={toggleMode}>
              {mode === "light" ? (
                <Tooltip title="Dark">
                  <DarkModeIcon />
                </Tooltip>
              ) : (
                <Tooltip title="Light">
                  <LightModeIcon />
                </Tooltip>
              )}
            </IconButton>
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
