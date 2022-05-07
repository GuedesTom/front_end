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
        .catch((err) => alert("Veuiller verifier vos données."));
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      submitHandler();
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
        onKeyDown={handleKeyDown}
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
        onKeyDown={handleKeyDown}
      />
      <label for="email" class="form__label">
        Adresse Email
      </label>
      <label class="form__label">exemple : exemple@exemple.com</label>
      <input
        id="password"
        class="form__input"
        type="password"
        placeholder="Mot de passe"
        value={password}
        onChange={(event) => setpassword(event.target.value)}
        onKeyDown={handleKeyDown}
      />
      <label for="password" class="form__label">
        Mot de passe
      </label>
      <label class="form__label">Minimum : 8 caracteres</label>
      <div class="btn-container">
        <button onClick={submitHandler}>
          <span class="text">Inscription</span>
          <div class="icon-container">
            <div class="icon icon--left">
              <svg>
                <use xlinkHref="#arrow-right"></use>
              </svg>
            </div>
            <div class="icon icon--right">
              <svg>
                <use xlinkHref="#arrow-right"></use>
              </svg>
            </div>
          </div>
        </button>
      </div>
      <svg style={{ display: "none" }}>
        <symbol id="arrow-right" viewBox="0 0 20 10">
          <path d="M14.84 0l-1.08 1.06 3.3 3.2H0v1.49h17.05l-3.3 3.2L14.84 10 20 5l-5.16-5z"></path>
        </symbol>
      </svg>
    </div>
  );
}
