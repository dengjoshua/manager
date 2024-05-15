import { Outlet, Navigate } from "react-router-dom";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const auth_token = cookies.get("auth_token");

const ProtectedRoute = () => {
  return auth_token ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
