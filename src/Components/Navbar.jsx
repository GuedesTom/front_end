import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { SagagaContext } from "../SagagaContext";
import axios from "axios";

export default function Navbar() {
  let { token, settoken } = useContext(SagagaContext);
  const [admin, setAdmin] = useState();
  const [creator, setCreator] = useState();

  token
    ? axios
        .get("/api/user", {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          setCreator(res.data.content_creator);
          setAdmin(res.data.admin);
        })
        .catch((err) => console.log(err.response))
    : console.log("Pensez a vous connectez");

  const deconnexion = (event) => {
    settoken("");
    localStorage.removeItem("token");
  };
  return (
    <nav className="nav-bar">
      {token ? (
        <ul className="menu-bar">
          <Link style={{ textDecoration: "none" }} to="/">
            <li>
              <span>Accueil</span>
            </li>
          </Link>

          {creator ? (
            <Link style={{ textDecoration: "none" }} to="/Create">
              <li>
                <span>Ajouter Contenue</span>
              </li>
            </Link>
          ) : null}
          {creator ? (
            <Link style={{ textDecoration: "none" }} to="/Creator/AdminContent">
              <li>
                <span>Gerer Contenue</span>
              </li>
            </Link>
          ) : null}
          {admin ? (
            <Link style={{ textDecoration: "none" }} to="/Admin/Content">
              <li>
                <span>Gerer Content</span>
              </li>
            </Link>
          ) : null}
          {admin ? (
            <Link style={{ textDecoration: "none" }} to="/Admin/User">
              <li>
                <span>Gerer Utilisateur</span>
              </li>
            </Link>
          ) : null}

          <Link style={{ textDecoration: "none" }} to="/" onClick={deconnexion}>
            <li>
              <span>Deconnexion</span>
            </li>
          </Link>
        </ul>
      ) : (
        <ul className="menu-bar">
          <Link style={{ textDecoration: "none" }} to="/">
            <li>
              <span>Accueil</span>
            </li>
          </Link>

          <Link style={{ textDecoration: "none" }} to="/Inscription">
            <li>
              <span>Inscription</span>
            </li>
          </Link>

          <Link style={{ textDecoration: "none" }} to="/Connexion">
            <li>
              <span>Connexion</span>
            </li>
          </Link>
        </ul>
      )}
    </nav>
  );
}
