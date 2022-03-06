import "../App.css";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SagagaContext } from "../SagagaContext";
import axios from "axios";

export default function Inscription() {
  let { token } = useContext(SagagaContext);
  const [nom, setnom] = useState("");
  const [description, setdescription] = useState("");
  const [genre, setgenre] = useState("");
  const [pegi, setpegi] = useState("");
  const [url, seturl] = useState("");
  let navigate = useNavigate();
  const submitHandler = (event) => {
    const content = { nom, description, genre, pegi, url };
    if (
      nom === "" ||
      description === "" ||
      genre === "" ||
      pegi === "" ||
      url === ""
    ) {
      alert("Manque des champs!");
    } else {
      axios
        .post("/api/content", content, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          console.log(res.data);
          navigate("/");
        })
        .catch((err) => console.log(err.response));
    }
  };

  return (
    <div id="div">
      <input
        type="text"
        placeholder="nom"
        value={nom}
        onChange={(event) => setnom(event.target.value)}
      />
      <br />
      <br />
      <input
        type="text"
        placeholder="description"
        value={description}
        onChange={(event) => setdescription(event.target.value)}
      />
      <br />
      <br />
      <input
        type="text"
        placeholder="genre"
        value={genre}
        onChange={(event) => setgenre(event.target.value)}
      />
      <br />
      <br />
      <input
        type="number"
        placeholder="pegi"
        value={pegi}
        onChange={(event) => setpegi(event.target.value)}
      />
      <br />
      <br />
      <input
        type="url"
        placeholder="url"
        value={url}
        onChange={(event) => seturl(event.target.value)}
      />
      <br />
      <br />
      <button onClick={submitHandler}> Ajouter </button>
    </div>
  );
}
