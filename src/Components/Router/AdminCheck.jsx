import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function AdminRoute({
  user,
  redirectPath = "/Inscription",
  children,
}) {
  const [admin, setAdmin] = useState("");
  useEffect(() => {
      axios
    .get("/api/user", {
      headers: {
        Authorization: "Bearer " + user,
      },
    })
    .then((res) => {
      setAdmin(res.data.admin);
    })
    .catch((err) => console.log(err.response));
    }, [user]);
  console.log("admin : " + admin);
  if (!user && admin === true) {
    return children ? children : <Outlet />;
  }

  return <Navigate to={redirectPath} replace />;
}
