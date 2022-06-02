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
      .catch((err) => console.log(err.response));
  }, [token]);

  return (
    <div id="container">
      <ul class="cards">
        {listAAfficher.map((content) => {
          console.log("first");
          return (
            <li key={content._id}>
              <a onClick={() => updateContent(content._id)} class="card">
                <img
                  src={`/api/picture/download/${content.picture}`}
                  class="card__image"
                  alt=""
                />
                <div class="card__overlay">
                  <div class="card__header">
                    <svg class="card__arc" xmlns="http://www.w3.org/2000/svg">
                      <path />
                    </svg>
                    <img
                      class="card__thumb"
                      src="https://i.imgur.com/7D7I6dI.png"
                      alt=""
                    />
                    <div class="card__header-text">
                      <h3 class="card__title">{content.name}</h3>
                      <span class="card__status">{content.genres}</span>
                    </div>
                  </div>
                  <p class="card__description">{content.description}</p>
                </div>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
