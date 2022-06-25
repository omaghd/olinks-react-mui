import Stack from "@mui/material/Stack";

import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const DashboardLayout = () => {
  return (
    <>
      <Navbar />
      <Stack direction="row" spacing={{ xs: 0, sm: 3 }}>
        <Sidebar />
        <Outlet />
      </Stack>
    </>
  );
};

export default DashboardLayout;
