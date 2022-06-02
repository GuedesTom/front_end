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
  const [genres, setgenres] = useState("");
  const [pegi, setpegi] = useState("");
  // const [contentAAfficher, setcontentAAfficher] = useState({});
  let navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/api/content/" + id)
      .then((res) => {
        setname(res.data.name);
        setdescription(res.data.description);
        setgenres(res.data.genres);
        setpegi(res.data.pegi);
      })
      .catch((err) => console.log(err.response));
  },[id]);

  const deleteContent = (id) => {
    axios
      .delete("/api/content/" + id, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        console.log(res.data);
        navigate("/");
      })
      .catch((err) => console.log(err.response));
  };

  // const setParams = async setparam => {
  // if (name === "" || description === "" || genres === "" || pegi === "") {
  //   if (name === "") {
  //     console.log("pas de nom");
  //     await setname(contentAAfficher.name);
  //   }
  //   if (description === "") {
  //     console.log("pas de description");
  //     await setdescription(contentAAfficher.description);
  //   }
  //   if (genres === "") {
  //     console.log("pas de genres");
  //     await setgenres(contentAAfficher.genres);
  //   }
  //   if (pegi === "") {
  //     console.log("pas de pegi");
  //     await setpegi(contentAAfficher.pegi);
  //   }
  // }
  // submitHandler();
  // }

  const submitHandler = (event) => {
    const content = { name, description, genres, pegi };
    console.log(content);
    axios
      .patch("/api/content/" + id, content, {
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

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      submitHandler();
    }
  };

  return (
    <div id="div">
      <label for="name" class="form__label">
        Nom
      </label>
      <input
        id="name"
        class="form__input"
        type="text"
        placeholder="Nom"
        value={name}
        onChange={(event) => setname(event.target.value)}
        onKeyDown={handleKeyDown}
      />
      <label for="description" class="form__label">
        "Description"
      </label>
      <input
        id="description"
        class="form__input"
        type="text"
        placeholder="Description"
        value={description}
        onChange={(event) => setdescription(event.target.value)}
        onKeyDown={handleKeyDown}
      />
      <label for="genres" class="form__label">
        Genres
      </label>
      <input
        id="genres"
        class="form__input"
        type="text"
        placeholder="Genres"
        value={genres}
        onChange={(event) => setgenres(event.target.value)}
        onKeyDown={handleKeyDown}
      />
      <label for="pegi" class="form__label">
        PEGI
      </label>
      <input
        id="pegi"
        class="form__input"
        type="number"
        placeholder="PEGI"
        value={pegi}
        onChange={(event) => setpegi(event.target.value)}
        onKeyDown={handleKeyDown}
      />
      <div class="btn-container">
        <button onClick={submitHandler}>
          <span class="text">Ajouter</span>
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

      <div class="btn-container">
        <button onClick={() => deleteContent(id)}>
          <span class="text">Supprimer</span>
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
