import { createContext, useContext, useState } from "react";

const MenuContext = createContext();

export const MenuContextProvider = ({ children }) => {
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleCloseMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <MenuContext.Provider
      value={{ anchorElUser, setAnchorElUser, handleCloseMenu }}
    >
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => {
  return useContext(MenuContext);
};
