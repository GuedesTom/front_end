import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute ({
  isAllowed,
  redirectPath = '/Inscription',
  children,
}) {
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};
