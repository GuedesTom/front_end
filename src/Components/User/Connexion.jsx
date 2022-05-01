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
        type="username"
        placeholder="Username"
        value={username}
        onChange={(event) => setusername(event.target.value)}
      />
      <br /> <br />
      <input
        type="password"
        placeholder="Mot de pass"
        value={password}
        onChange={(event) => setpassword(event.target.value)}
      />
      <br /> <br />
      <button onClick={submitHandler}> Connexion </button>
    </div>
  );
}
