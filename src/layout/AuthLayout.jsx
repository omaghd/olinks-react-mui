import Box from "@mui/material/Box";

import { Navigate, Outlet } from "react-router-dom";

import Navbar from "../components/Layout/Navbar";
import Footer from "../components/Layout/Footer";

import { useAuth } from "../context/AuthContext";

const AuthLayout = () => {
  const { user } = useAuth();

  if (user) return <Navigate to="/dashboard" replace={true} />;

  return (
    <Box
      bgcolor={"background.default"}
      color={"text.primary"}
      sx={{ minHeight: "100vh" }}
    >
      <Navbar />

      <Box sx={{ paddingTop: "50px" }}>
        <Outlet />
      </Box>

      <Box sx={{ paddingTop: "50px" }}>
        <Footer />
      </Box>
    </Box>
  );
};

export default AuthLayout;
