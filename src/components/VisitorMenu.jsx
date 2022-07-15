import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";

import { Link } from "react-router-dom";

import { useMenu } from "../context/MenuContext";

const userItems = [
  { name: "Login", link: "/login" },
  { name: "Register", link: "/register" },
];

const VisitorMenu = () => {
  const { handleCloseMenu } = useMenu();

  return userItems.map((item) => (
    <MenuItem
      key={item.link}
      component={Link}
      to={item.link}
      onClick={handleCloseMenu}
    >
      <Typography textAlign="center">{item.name}</Typography>
    </MenuItem>
  ));
};

export default VisitorMenu;
