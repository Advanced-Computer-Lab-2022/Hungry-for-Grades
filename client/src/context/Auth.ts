/* import { useContext } from "react";
import { useLocation } from "react-router-dom";
import AuthContext from "../Context/authProvider";


const Auth = ({ allowedRoles }) => {
  const { auth } = useContext(AuthContext);
  const location = useLocation();

  return allowedRoles.find((role) => auth.role.includes(role)) ? (
    <Outlet />
  ) : auth?.name ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/register" state={{ from: location }} replace />
  );
}; */