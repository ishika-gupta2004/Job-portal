import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function AdminRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" />;
  }

  const decodedToken = jwtDecode(token);

  if (decodedToken.role !== "admin") {
    return <Navigate to="/" />;
  }

  return children;
}