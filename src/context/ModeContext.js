import { createContext, useContext, useEffect, useState } from "react";

const ModeContext = createContext();

export const ModeContextProvider = ({ children }) => {
  const [mode, setMode] = useState("light");

  useEffect(() => {
    let currentMode = localStorage.getItem("mode") ?? "light";
    setMode(currentMode);
  }, [mode]);

  const toggleMode = () => {
    let currentMode = mode === "light" ? "dark" : "light";
    localStorage.setItem("mode", currentMode);
    setMode(currentMode);
  };

  return (
    <ModeContext.Provider value={{ mode, toggleMode }}>
      {children}
    </ModeContext.Provider>
  );
};

export const useMode = () => {
  return useContext(ModeContext);
};
