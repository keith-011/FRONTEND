import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute: React.FC = () => {
  const accessToken = localStorage.getItem("token");

  return accessToken ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
