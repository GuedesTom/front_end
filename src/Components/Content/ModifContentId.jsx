import "../../App.css";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SagagaContext } from "../../SagagaContext";
import axios from "axios";

export default function ModifContentId() {
  const { id } = useParams();
  let { token } = useContext(SagagaContext);
  const [name, setname] = useState("");
  const [description, setdescription] = useState("");
  const [genre, setgenre] = useState("");
  const [pegi, setpegi] = useState("");
  const [contentAAfficher, setcontentAAfficher] = useState({});
  let navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/api/content/" + id)
      .then((res) => setcontentAAfficher(res.data))
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
  };

  const submitHandler = (event) => {
    const content = { name, description, genre, pegi };
    console.log(content);
    axios
      .post("/api/content", content, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        console.log(res.data);
        navigate("/Admin/Content");
      })
      .catch((err) => console.log(err.response));
  };

  return (
    <div id="div">
      <input
        id="name"
        class="form__input"
        type="text"
        placeholder={contentAAfficher.name}
        value={name}
        onChange={(event) => setname(event.target.value)}
      />
      <label for="name" class="form__label">
        {contentAAfficher.name}
      </label>
      <input
        id="description"
        class="form__input"
        type="text"
        placeholder={contentAAfficher.description}
        value={description}
        onChange={(event) => setdescription(event.target.value)}
      />
      <label for="description" class="form__label">
        {contentAAfficher.description}
      </label>
      <input
        id="genre"
        class="form__input"
        type="text"
        placeholder={contentAAfficher.genre}
        value={genre}
        onChange={(event) => setgenre(event.target.value)}
      />
      <label for="genre" class="form__label">
        {contentAAfficher.genre}
      </label>
      <input
        id="pegi"
        class="form__input"
        type="number"
        placeholder={contentAAfficher.pegi}
        value={pegi}
        onChange={(event) => setpegi(event.target.value)}
      />
      <label for="pegi" class="form__label">
        {contentAAfficher.pegi}
      </label>
      <button onClick={submitHandler} class="custom-btn btn-6">
        Ajouter
      </button>

      <button
        onClick={() => deleteContent(contentAAfficher._id)}
        class="custom-btn btn-6"
      >
        {" "}
        Supprimer{" "}
      </button>
    </div>
  );
}
