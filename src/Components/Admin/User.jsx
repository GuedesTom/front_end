import "../../App.css";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { SagagaContext } from "../../SagagaContext";

export default function AdminUser() {
  let { token } = useContext(SagagaContext);
  const [listAAfficher, setlistAAfficher] = useState([]);
  let navigate = useNavigate();

  const updateUser = (id) => {
    navigate(`/User/${id}`);
  };

  useEffect(() => {
    axios
      .get("/api/user/all", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => setlistAAfficher(res.data))
      .catch((err) => console.log(err.response));
  }, [token]);

  return (
    <div id="container">
      <ul class="cards">
        {listAAfficher.map((user) => {
          console.log("first");
          return (
            <li>
              <a onClick={() => updateUser(user._id)} class="card">
                <img
                  src="https://thumbs.dreamstime.com/b/ic-ne-d-utilisateur-de-compte-silhouette-de-signe-d-un-homme-97283162.jpg"
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
                      <h3 class="card__title">{user.username}</h3>
                      <span class="card__status">Creator : {user.content_creator}</span>
                    </div>
                  </div>
                  <p class="card__description">Admin : {user.admin}</p>
                </div>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
