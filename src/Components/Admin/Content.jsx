import "../../App.css";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { SagagaContext } from "../../SagagaContext";

export default function AdminContent() {
  let { token } = useContext(SagagaContext);
  const [listAAfficher, setlistAAfficher] = useState([]);
  let navigate = useNavigate();

  const updateContent = (id) => {
    navigate(`/Update/${id}`);
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
              <a onClick={() => updateContent(content._id)} className="card">
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
                      className="card__thumb"
                      src="https://i.imgur.com/7D7I6dI.png"
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
