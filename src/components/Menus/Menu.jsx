import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import MUIMenu from "@mui/material/Menu";

import { useMenu } from "../../context/MenuContext";

const Menu = ({ children, altAvatar, srcAvatar }) => {
  const { anchorElUser, setAnchorElUser, handleCloseMenu } = useMenu();

  const handleOpenMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  return (
    <Box sx={{ flexGrow: 0 }}>
      <IconButton onClick={handleOpenMenu} sx={{ p: 0 }}>
        <Avatar
          alt={altAvatar}
          src={srcAvatar}
          sx={{
            width: { xs: 30, sm: 45 },
            height: { xs: 30, sm: 45 },
          }}
        />
      </IconButton>
      <MUIMenu
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
        onClose={handleCloseMenu}
      >
        {children}
      </MUIMenu>
    </Box>
  );
};

export default Menu;
