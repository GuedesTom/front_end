import axios from "axios";
import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function CreatorRoute({
  user,
  redirectPath = "/Inscription",
  children,
}) {
  const [admin, setAdmin] = useState("");
  const [creator, setCreator] = useState("");
  const requete = () => {
    axios
      .get("/api/user", {
        headers: {
          Authorization: "Bearer " + user,
        },
      })
      .then((res) => {
        setCreator(res.data.content_creator);
        setAdmin(res.data.admin);
      })
      .catch((err) => console.log(err.response));
  };
  requete();
  if (creator === "" || admin === "") {
    console.log("fromage");
    requete();
  }
  console.log("creator : " + creator);
  console.log("admin : " + admin);
  if (!user || (!creator || !admin)) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
}
