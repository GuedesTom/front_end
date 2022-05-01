import "../../App.css";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SagagaContext } from "../../SagagaContext";
import axios from "axios";

export default function Inscription() {
  let { settoken } = useContext(SagagaContext);
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  let navigate = useNavigate();
  const submitHandler = (event) => {
    const user = { username, email, password };
    if (username === "" || email === "" || password === "") {
      alert("Manque des champs!");
    } else {
      axios
        .post("/api/user/signup", user)
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
    <div class="form__group">
      <input
        id="username"
        class="form__input"
        type="text"
        placeholder="Nom d'utilisateur"
        value={username}
        onChange={(event) => setusername(event.target.value)}
      />
      <label for="username" class="form__label">
        Nom d'utilisateur
      </label>
      <input
        id="email"
        class="form__input"
        type="email"
        placeholder="Adresse Email"
        value={email}
        onChange={(event) => setemail(event.target.value)}
      />
      <label for="email" class="form__label">
        Adresse Email
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
        Inscription
      </button>
    </div>
  );
}
