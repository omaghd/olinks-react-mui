import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

import MenuIcon from "@mui/icons-material/Menu";

import { useState } from "react";
import { useAuth } from "../context/AuthContext";

import { MenuContextProvider } from "../context/MenuContext";

import MobileSidebar from "./MobileSidebar";
import Menu from "./Menu";
import UserMenu from "./UserMenu";
import VisitorMenu from "./VisitorMenu";

const Navbar = () => {
  const [openSidebar, setOpenSidebar] = useState(false);

  const { user, profile } = useAuth();

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

          <MenuContextProvider>
            <Menu
              altAvatar={user ? profile?.username : ""}
              srcAvatar={user ? profile?.photoURL : ""}
            >
              {user ? <UserMenu /> : <VisitorMenu />}
            </Menu>
          </MenuContextProvider>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
