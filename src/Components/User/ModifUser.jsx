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
      .get("/api/user/" + id, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => setUserAAfficher(res.data))
  });

  const deleteContent = () => {
    axios
      .delete("/api/user/" + id, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        navigate("/Admin/User");
      })
  };

  const submitHandler = () => {
    const content = { name, description, genre, pegi };
    axios
      .post("/api/user", content, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        navigate("/");
      })
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      submitHandler();
    }
  };

  return (
    <div id="div">
      <input
        id="name"
        className="form__input"
        type="text"
        placeholder={userAAfficher.name}
        value={name}
        onChange={(event) => setname(event.target.value)}
        onKeyDown={handleKeyDown}
      />
      <label htmlFor="name" className="form__label">
        {userAAfficher.name}
      </label>
      <input
        id="description"
        className="form__input"
        type="text"
        placeholder={userAAfficher.description}
        value={description}
        onChange={(event) => setdescription(event.target.value)}
        onKeyDown={handleKeyDown}
      />
      <label htmlFor="description" className="form__label">
        {userAAfficher.description}
      </label>
      <input
        id="genre"
        className="form__input"
        type="text"
        placeholder={userAAfficher.genre}
        value={genre}
        onChange={(event) => setgenre(event.target.value)}
        onKeyDown={handleKeyDown}
      />
      <label htmlFor="genre" className="form__label">
        {userAAfficher.genre}
      </label>
      <input
        id="pegi"
        className="form__input"
        type="number"
        placeholder={userAAfficher.pegi}
        value={pegi}
        onChange={(event) => setpegi(event.target.value)}
        onKeyDown={handleKeyDown}
      />
      <label htmlFor="pegi" className="form__label">
        {userAAfficher.pegi}
      </label>
      <div className="btn-container">
        <button onClick={submitHandler}>
          <span className="text">Ajouter</span>
          <div className="icon-container">
            <div className="icon icon--left">
              <svg>
                <use xlinkHref="#arrow-right"></use>
              </svg>
            </div>
            <div className="icon icon--right">
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

      <div className="btn-container">
        <button onClick={() => deleteContent(userAAfficher._id)}>
          <span className="text">Supprimer</span>
          <div className="icon-container">
            <div className="icon icon--left">
              <svg>
                <use xlinkHref="#arrow-right"></use>
              </svg>
            </div>
            <div className="icon icon--right">
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
