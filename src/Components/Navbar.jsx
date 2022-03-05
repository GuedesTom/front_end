import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { SagagaContext } from "../SagagaContext";

export default function Navbar() {
  let { token, settoken } = useContext(SagagaContext);
  const deconnexion = (event) => {
    settoken("");
    localStorage.removeItem("token");
  };
  return (
    <nav>
      {token ? (
        <ul>
          <Link to="/"> Accueil </Link>
          <Link to="/Maliste">Ma Liste</Link>
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
