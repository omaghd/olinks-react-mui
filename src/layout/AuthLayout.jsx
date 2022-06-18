import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";

const AuthLayout = () => {
  const { user } = useAuth();

  if (user) return <Navigate to="/dashboard" replace={true} />;

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default AuthLayout;
