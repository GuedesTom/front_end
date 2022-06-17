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
  });
  return (
    <div>
      <li>
        <a className="card">
          <img
            src={`/api/picture/download/${contentAAfficher.picture}`}
            className="card__image"
            alt=""
          />
          <div className="card__overlay">
            <div className="card__header">
              <svg className="card__arc" xmlns="http://www.w3.org/2000/svg">
                <path />
              </svg>
              <img
                className="card__thumb"
                alt=""
              />
              <div className="card__header-text">
                <h3 className="card__title">{contentAAfficher.name}</h3>
                <span className="card__status">{contentAAfficher.genres}</span>
              </div>
            </div>
            <audio
              className="card__audio"
              src={`/api/file/download/${contentAAfficher.filename}`}
              controls
            />
          </div>
        </a>
      </li>
    </div>
  );
}
