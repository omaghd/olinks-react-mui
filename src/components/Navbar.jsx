import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";

import MenuIcon from "@mui/icons-material/Menu";

import { Link } from "react-router-dom";

import { useState } from "react";
import { useAuth } from "../context/AuthContext";

import MobileSidebar from "./MobileSidebar";
import UserMenu from "./UserMenu";

const Navbar = () => {
  const [openSidebar, setOpenSidebar] = useState(false);

  const { user } = useAuth();

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
              <UserMenu />
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
