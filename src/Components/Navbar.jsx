import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { SagagaContext } from "../SagagaContext";
import axios from "axios";

export default function Navbar() {
  let { token, settoken } = useContext(SagagaContext);
  const [admin, setAdmin] = useState();
  const [creator, setCreator] = useState();

  token? (axios
    .get("/api/user", {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => {setCreator(res.data.content_creator); setAdmin(res.data.admin)})
    .catch((err) => console.log(err.response))) : (console.log("Pensez a vous connectez"));

  const deconnexion = (event) => {
    settoken("");
    localStorage.removeItem("token");
  };
  return (
    <nav>
      {token ? (
        <ul class="navbar">
          <Link to="/" class="custom-btn btn-6">
            <span>Accueil</span>
          </Link>
          {creator ? (
            <Link to="/Create" class="custom-btn btn-6">
              <span>Ajouter Contenue</span>
            </Link>
          ) : null}
          {admin ? (
            <Link to="/Admin/Content" class="custom-btn btn-6">
              <span>Gerer Content</span>
            </Link>
          ) : null}
          {admin ? (
            <Link to="/Admin/User" class="custom-btn btn-6">
              <span>Gerer Utilisateur</span>
            </Link>
          ) : null}
          <Link to="/Maliste" class="custom-btn btn-6">
            <span>Ma Liste</span>
          </Link>
          <Link to="/" onClick={deconnexion} class="custom-btn btn-6">
            <span>Deconnexion</span>
          </Link>
        </ul>
      ) : (
        <ul>
          <Link to="/" class="custom-btn btn-6">
            <span>Accueil</span>
          </Link>
          <Link to="/Inscription" class="custom-btn btn-6">
            <span>Inscription</span>
          </Link>
          <Link to="/Connexion" class="custom-btn btn-6">
            <span>Connexion</span>
          </Link>
        </ul>
      )}
    </nav>
  );
}
