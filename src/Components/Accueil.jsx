import "../App.css";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { SagagaContext } from "../SagagaContext";

export default function Accueil() {
  let { token } = useContext(SagagaContext);
  const [listAAfficher, setlistAAfficher] = useState([]);
  const [listIDContentUser, setlistIDContentUser] = useState([]);
  const [added, setAdded] = useState([]);
  let navigate = useNavigate();

  const song = (id) => {
    axios
      .patch(
        `/api/user/${id}`,
        { id },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
  };

  useEffect(() => {
    token
      ? axios
          .get("/api/user", {
            headers: {
              Authorization: "Bearer " + token,
            },
          })
          .then((res) => {
            setlistIDContentUser(res.data.content);
            listIDContentUser.forEach((idContent) => {
              listAAfficher.forEach((element) => {
                if (idContent === element._id) {
                  setAdded([...element._id]);
                }
              });
            });
          })
      : console.log();
  }, [listAAfficher, listIDContentUser, token]);

  const details = (id) => {
    navigate(`/Contents/${id}`);
  };

  useEffect(() => {
    axios
      .get("/api/content")
      .then((res) => setlistAAfficher(res.data))
  }, [token]);

  return (
    <div id="container">
      <ul className="cards">
        {listAAfficher.map((content) => {
          return (
            <li key={content._id}>
              <a onClick={() => details(content._id)} className="card">
                <img
                  src={`/api/picture/download/${content.picture}`}
                  className="card__image"
                  alt=""
                />
                <div className="card__overlay">
                  <div className="card__header">
                    <svg
                      className="card__arc"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path />
                    </svg>
                    <img
                      onClick={() => song(content._id)}
                      className="card__thumb"
                      alt=""
                    />
                    <div className="card__header-text">
                      <h3 className="card__title">{content.name}</h3>
                      <span className="card__status">{content.genres}</span>
                    </div>
                  </div>
                  <p className="card__description">{content.description}</p>
                </div>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
