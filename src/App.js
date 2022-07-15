import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { AuthContextProvider } from "./context/AuthContext";

import RequireAuth from "./components/RequireAuth";

import AuthLayout from "./layout/AuthLayout";
import DashboardLayout from "./layout/DashboardLayout";

import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import Dashboard from "./pages/dashboard";
import Profile from "./pages/profile";
import Settings from "./pages/settings";
import PublicProfile from "./pages/public-profile";
import NotFound from "./pages/not-found";

import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#0d9488",
    },
  },
});

const App = () => (
  <ThemeProvider theme={theme}>
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Navigate to="/dashboard" replace={true} />}
          />
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
          <Route element={<RequireAuth />}>
            <Route element={<DashboardLayout />}>
              <Route path="/dashboard" element={<Dashboard />}></Route>
              <Route path="/profile" element={<Profile />}></Route>
              <Route path="/settings" element={<Settings />}></Route>
            </Route>
          </Route>
          <Route path=":username" element={<PublicProfile />} />
          <Route path="/404" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  </ThemeProvider>
);

export default App;
