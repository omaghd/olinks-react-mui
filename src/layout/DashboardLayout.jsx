import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const DashboardLayout = () => {
  return (
    <Box
      bgcolor={"background.default"}
      color={"text.primary"}
      sx={{ minHeight: "100vh" }}
    >
      <Navbar />
      <Stack direction="row" spacing={{ xs: 0, sm: 3 }}>
        <Sidebar />
        <Outlet />
      </Stack>
    </Box>
  );
};

export default DashboardLayout;
