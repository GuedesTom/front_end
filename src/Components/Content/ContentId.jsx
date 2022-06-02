import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function ContentId() {
  const { id } = useParams();
  const [contentAAfficher, setcontentAAfficher] = useState({});
  useEffect(() => {
    axios
      .get("/api/content/" + id)
      .then((res) => setcontentAAfficher(res.data))
      .catch((err) => console.log(err.response));
  });
  return (
    <div>
      <li>
        <a class="card">
          <img
            src={`/api/picture/download/${contentAAfficher.picture}`}
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
                src="https://cdn-icons.flaticon.com/png/512/1665/premium/1665680.png?token=exp=1651931861~hmac=e2fcf4966565dba5b9ca620054b6e629"
                alt=""
              />
              <div class="card__header-text">
                <h3 class="card__title">{contentAAfficher.name}</h3>
                <span class="card__status">{contentAAfficher.genres}</span>
              </div>
            </div>
            <audio
              class="card__audio"
              src={`/api/file/download/${contentAAfficher.filename}`}
              controls
            />
          </div>
        </a>
      </li>
    </div>
  );
}
