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

  // const contentAlradyAdded = (id) => {
  //   axios
  //     .get("/api/user", {
  //       headers: {
  //         Authorization: "Bearer " + token,
  //       },
  //     })
  //     .then((res) => {setlistIDContentUser(res.data.content);
  //       listIDContentUser.forEach((idContent) => {
  //         if (idContent === id) {
  //         return true;
  //       }
  //     })})
  //     .catch((err) => console.log(err.response))
  // }

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
    console.log("first");
        return (
          <div id="card" key={content._id}>
            <li id="title">
              {content.name}
              <ul>
                <img src={`/api/picture/download/${content.picture}`} alt="" height="10px" lengt="10px"/>
                
              </ul>
              <p>{content.description} </p>
            </li>
            {/* <button onClick={() => details(content._id)}>Details</button>
            { contentAlradyAdded(content._id) ? 
                  <button>Deja ajouter</button> : 
                  <button onClick={() => song(content._id)}>Ecouter plus tard</button>} */}
          </div>
        );
      })}
    </div>
  );
}
