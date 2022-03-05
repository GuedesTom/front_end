import "../App.css";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SagagaContext } from "../SagagaContext";
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
    <div id="div">
      <input
        type="text"
        placeholder="username"
        value={username}
        onChange={(event) => setusername(event.target.value)}
      />
      <br />
      <br />
      <input
        type="email"
        placeholder="Adresse mail"
        value={email}
        onChange={(event) => setemail(event.target.value)}
      />
      <br />
      <br />
      <input
        type="password"
        placeholder="Mot de pass"
        value={password}
        onChange={(event) => setpassword(event.target.value)}
      />
      <br />
      <br />
      <button onClick={submitHandler}>Inscription</button>
    </div>
  );
}
