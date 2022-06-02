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
    console.log("TEST");
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
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err.response));
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
          .catch((err) => console.log(err.response))
      : console.log("Pensez a vous connectez");
  }, [listAAfficher, token]);

  const details = (id) => {
    navigate(`/Contents/${id}`);
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
          return (
            <li key={content._id}>
              <a onClick={() => details(content._id)} class="card">
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
                      onClick={() => song(content._id)}
                      class="card__thumb"
                      src="https://cdn-icons.flaticon.com/png/512/1665/premium/1665680.png?token=exp=1651931861~hmac=e2fcf4966565dba5b9ca620054b6e629"
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

// <!-- div id="card" key={content._id}>
//          <li id="title">
//            {content.name}
//            <ul>
//              <img
//                src={`/api/picture/download/${content.picture}`}
//                alt=""
//                height="80px"
//                lengt="80px"
//              />
//            </ul>
//            <p>{content.description} </p>
//          </li>

//          <button
//            onClick={() => details(content._id)}
//            class="custom-btn btn-6"
//          >
//            Details
//          </button -->
//          {token ? (
//            added.forEach((element) => {
//              element._id === content._id ? (
//                <button class="custom-btn btn-6">
//                  <span>Deja Ajouter</span>
//                </button>
//              ) : (
//                <button
//                  onClick={() => song(content._id)}
//                  class="custom-btn btn-6"
//                >
//                  <span>Ecouter plus tard</span>
//                </button>
//              );
//            })
//          ) : (
//            <button
//              onClick={() => navigate("/Connexion")}
//              class="custom-btn btn-6"
//            >
//              <span>Connexion</span>
//            </button -->
