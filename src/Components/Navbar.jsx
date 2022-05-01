import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { SagagaContext } from "../SagagaContext";
import axios from "axios";

export default function Navbar() {
  let { token, settoken } = useContext(SagagaContext);
  const [creator, setcreator] = useState();

  token? (axios
    .get("/api/user", {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => setcreator(res.data.content_creator))
    .catch((err) => console.log(err.response))) : (console.log("Pensez a vous connectez"));

  const deconnexion = (event) => {
    settoken("");
    localStorage.removeItem("token");
  };
  return (
    <nav>
      {token ? (
        <ul>
          <Link to="/"> Accueil </Link>
          {creator ? <Link to="/Create"> Ajouter Contenue </Link> : null}
          <Link to="/Maliste"> Ma Liste </Link>
          <Link to="/" onClick={deconnexion}>
            Deconnexion
          </Link>
        </ul>
      ) : (
        <ul>
          <Link to="/"> Accueil </Link>
          <Link to="/Inscription"> Inscription </Link>
          <Link to="/Connexion"> Connexion</Link>
        </ul>
      )}
    </nav>
  );
}
