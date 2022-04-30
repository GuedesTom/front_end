import axios from "axios";
import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute({
  user,
  redirectPath = "/Inscription",
  children,
}) {
  console.log("admin : " + user);
  if (user) {
    return children ? children : <Outlet />;
  }
  return <Navigate to={redirectPath} replace />;
}
