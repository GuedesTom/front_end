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
        <ul class="menu-bar">
          <li>
            <Link style={{ textDecoration: 'none' }} to="/">
              <span>Accueil</span>
            </Link>
          </li>
          {creator ? (
            <li>
              <Link style={{ textDecoration: 'none' }} to="/Create">
                <span>Ajouter Contenue</span>
              </Link>
            </li>
          ) : null}
          {admin ? (
            <li>
              <Link style={{ textDecoration: 'none' }} to="/Admin/Content">
                <span>Gerer Content</span>
              </Link>
            </li>
          ) : null}
          {admin ? (
            <li>
              <Link style={{ textDecoration: 'none' }} to="/Admin/User">
                <span>Gerer Utilisateur</span>
              </Link>
            </li>
          ) : null}
          <li>
            <Link style={{ textDecoration: 'none' }} to="/Maliste">
              <span>Ma Liste</span>
            </Link>
          </li>
          <li>
            <Link style={{ textDecoration: 'none' }} to="/" onClick={deconnexion}>
              <span>Deconnexion</span>
            </Link>
          </li>
        </ul>
      ) : (
        <ul class="menu-bar">
          <li>
            <Link style={{ textDecoration: 'none' }} to="/">
              <span>Accueil</span>
            </Link>
          </li>
          <li>
            <Link style={{ textDecoration: 'none' }} to="/Inscription">
              <span>Inscription</span>
            </Link>
          </li>
          <li>
            <Link style={{ textDecoration: 'none' }} to="/Connexion">
              <span>Connexion</span>
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
}
