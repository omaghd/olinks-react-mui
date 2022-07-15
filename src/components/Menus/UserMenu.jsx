import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

import { useAuth } from "../../context/AuthContext";
import { useMenu } from "../../context/MenuContext";

import { Link } from "react-router-dom";

const userItems = [
  { name: "Profile", link: "/profile" },
  { name: "Settings", link: "/settings" },
];

const UserMenu = () => {
  const { logout } = useAuth();

  const { handleCloseMenu } = useMenu();

  return (
    <>
      {userItems.map((item) => (
        <MenuItem
          key={item.link}
          component={Link}
          to={item.link}
          onClick={handleCloseMenu}
        >
          <Typography textAlign="center">{item.name}</Typography>
        </MenuItem>
      ))}
      <Divider />
      <MenuItem onClick={logout}>
        <Typography textAlign="center">Logout</Typography>
      </MenuItem>
    </>
  );
};

export default UserMenu;
