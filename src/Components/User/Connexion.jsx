import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { SagagaContext } from "../../SagagaContext";

export default function Connexion() {
  let { settoken } = useContext(SagagaContext);
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  let navigate = useNavigate();
  const submitHandler = (event) => {
    const user = { username, password };
    if (username === "" || password === "") {
      alert("Rempli!");
    } else {
      axios
        .post("/api/user/login", user)
        .then((res) => {
          const vartoken = res.data.token;
          settoken(vartoken);
          localStorage.setItem("token", vartoken);
          navigate("/");
        })
        .catch((err) => console.log(err.response));
    }
  };

  return (
    <div>
      <input
        id="username"
        class="form__input"
        type="username"
        placeholder="Nom d'Utilisateur"
        value={username}
        onChange={(event) => setusername(event.target.value)}
      />
      <label for="username" class="form__label">
        Nom d'Utilisateur
      </label>
      <input
        id="password"
        class="form__input"
        type="password"
        placeholder="Mot de passe"
        value={password}
        onChange={(event) => setpassword(event.target.value)}
      />
      <label for="password" class="form__label">
        Mot de passe
      </label>
      <button onClick={submitHandler} class="custom-btn btn-6">
        {" "}
        Connexion{" "}
      </button>
    </div>
  );
}
