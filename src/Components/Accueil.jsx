import "../App.css";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { SagagaContext } from "../SagagaContext";

export default function Accueil() {
  let { token } = useContext(SagagaContext);
  const [listAAfficher, setlistAAfficher] = useState([]);
  const [listIDContentUser, setlistIDContentUser] = useState([]);
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
      .then((res) => {})
      .catch((err) => console.log(err.response));
  };

  const contentAlradyAdded = (id) => {
    console.log("TEST");
    const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };
      axios
        .get("/api/user", config)
        .then((res) => setlistIDContentUser(res.data.content))
        .catch((err) => console.log(err.response));
    
    console.log(listIDContentUser);
    listIDContentUser.forEach((idContent) => {
      if (idContent === id) {
        console.log("TEST");
        return true;
      }
    });
  }

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
      {listAAfficher.map((content) => {
        return (
          <div id="card" key={content._id}>
            <li id="title">
              {content.name}
              <ul>
                <audio
                  src={`/api/file/download/${content.filename}`}
                  controls
                />
              </ul>
              <p>{content.description} </p>
            </li>
            <button onClick={() => details(content._id)}>Details</button>
            {token ? 
              (contentAlradyAdded(content._id) ? (
                  <button onClick={() => song(content._id)}>Ecouter plus tard</button>) : 
                  (<button>Deja ajouter</button>)) : 
              (<button onClick={() => navigate("/Connexion")}> Connexion</button>
            )}
          </div>
        );
      })}
    </div>
  );
}
