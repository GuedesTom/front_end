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
  }, [token]);

  return (
    <div id="container">
      <ul className="cards">
        {listAAfficher.map((user) => {
          return (
            <li key={user._id}>
              <a onClick={() => updateUser(user._id)} className="card">
                <img
                  src="https://thumbs.dreamstime.com/b/ic-ne-d-utilisateur-de-compte-silhouette-de-signe-d-un-homme-97283162.jpg"
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
                      <h3 className="card__title">{user.username}</h3>
                      <span className="card__status">
                        Creator : {user.content_creator}
                      </span>
                    </div>
                  </div>
                  <p className="card__description">Admin : {user.admin}</p>
                </div>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
