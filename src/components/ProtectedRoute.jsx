import { useLocation, Navigate } from "react-router-dom";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const isAuthenticated = !!cookies.get("auth_token");

  if (!isAuthenticated) {
    return (window.location = "/login");
  }

  return children;
};
