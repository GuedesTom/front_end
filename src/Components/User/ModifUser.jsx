import "../../App.css";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SagagaContext } from "../../SagagaContext";
import axios from "axios";

export default function ModifUser() {
  const { id } = useParams();
  let { token } = useContext(SagagaContext);
  const [name, setname] = useState("");
  const [description, setdescription] = useState("");
  const [genre, setgenre] = useState("");
  const [pegi, setpegi] = useState("");
  const [userAAfficher, setUserAAfficher] = useState({});
  let navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/api/user/" + id)
      .then((res) => setUserAAfficher(res.data))
      .catch((err) => console.log(err.response));
  });

  const deleteContent = (id) => {
    axios
      .delete("/api/content/" + id, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        console.log(res.data);
        navigate("/Admin/Content");
      })
      .catch((err) => console.log(err.response));
  }

  const submitHandler = (event) => {
    const content = { name, description, genre, pegi };
    console.log(content);
      axios
        .post("/api/user", content, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          console.log(res.data);
          navigate("/Admin/User");
        })
        .catch((err) => console.log(err.response));
  };

  return (
    <div id="div">
      <input
        id="name"
        class="form__input"
        type="text"
        placeholder={userAAfficher.name}
        value={name}
        onChange={(event) => setname(event.target.value)}
      />
      <label for="name" class="form__label">
        {userAAfficher.name}
      </label>
      <input
        id="description"
        class="form__input"
        type="text"
        placeholder={userAAfficher.description}
        value={description}
        onChange={(event) => setdescription(event.target.value)}
      />
      <label for="description" class="form__label">
        {userAAfficher.description}
      </label>
      <input
        id="genre"
        class="form__input"
        type="text"
        placeholder={userAAfficher.genre}
        value={genre}
        onChange={(event) => setgenre(event.target.value)}
      />
      <label for="genre" class="form__label">
        {userAAfficher.genre}
      </label>
      <input
        id="pegi"
        class="form__input"
        type="number"
        placeholder={userAAfficher.pegi}
        value={pegi}
        onChange={(event) => setpegi(event.target.value)}
      />
      <label for="pegi" class="form__label">
        {userAAfficher.pegi}
      </label>
      <button onClick={submitHandler} class="custom-btn btn-6">
        Ajouter
      </button>

      <button
        onClick={() => deleteContent(userAAfficher._id)}
        class="custom-btn btn-6"
      >
        {" "}
        Supprimer{" "}
      </button>
    </div>
  );
}
