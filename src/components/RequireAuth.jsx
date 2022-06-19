import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const RequireAuth = () => {
  const { user } = useAuth();

  return user ? <Outlet /> : <Navigate to="/login" replace={true} />;
};

export default RequireAuth;
