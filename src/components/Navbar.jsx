import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import MobileMenu from "./MobileMenu";
import { useState } from "react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <MobileMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      <AppBar position="static">
        <Toolbar>
          <Typography
            fontWeight={300}
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, userSelect: "none" }}
          >
            OLinks
          </Typography>
          <Stack
            direction="row"
            spacing={1}
            sx={{ display: { xs: "none", sm: "block" } }}
          >
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
          </Stack>
          <IconButton
            onClick={() => setMenuOpen(true)}
            color="inherit"
            sx={{ display: { xs: "block", sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
