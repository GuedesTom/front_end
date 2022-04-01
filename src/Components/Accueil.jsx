import "../App.css";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import ReactPlayer from "react-player";
import { SagagaContext } from "../SagagaContext";

export default function Accueil() {
  let { token } = useContext(SagagaContext);
  const [listAAfficher, setlistAAfficher] = useState([]);
  const [listContentUser, setlistContentUser] = useState([]);
  const [listContentUserAAfficher, setlistContentUserAAfficher] = useState([]);
  let navigate = useNavigate();

  const video = (id, name) => {
    axios
      .get(`/api/file/${id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err.response));
  };

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

  const details = (id) => {
    navigate(`/Contents/${id}`);
  };

  useEffect(() => {
    axios
      .get("/api/user", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => setlistContentUser(res.data.content))
      .catch((err) => console.log(err.response));
    listContentUser.map((content) => {
      return axios
        .get(`/api/content/${content}`)
        .then((res) => {
          setlistContentUserAAfficher((prevValue) => [res.data, ...prevValue]);
        })
        .catch((err) => console.log(err.response));
    });
  }, []);

  useEffect(() => {
    axios
      .get("/api/content")
      .then((res) => setlistAAfficher(res.data))
      .catch((err) => console.log(err.response));
  }, [token]);

  return (
    <div id="container">
      {listContentUserAAfficher.map((content) => {
        return (
          <div key={content}>
            <li id="title">
              {content.name}

              <p>{content.description} </p>
            </li>
          </div>
        );
      })}

      {listAAfficher.map((content) => {
        return (
          <div id="card" key={content._id}>
            <li id="title">
              {content.name}
              <ul>
                <video
                  width="100%"
                  height="100%"
                  src={`data:video/mp4;base64,${video(
                    content.url,
                    content.name
                  )}`}
                  controls
                  muted
                  config={{
                    youtube: {
                      playerVars: { showinfo: 1 },
                    },
                  }}
                />
              </ul>
              <p>{content.description} </p>
            </li>
            <button onClick={() => details(content._id)}>Details</button>
            {token ? (
              <button onClick={() => song(content._id)}>
                Ecouter plus tard
              </button>
            ) : (
              <button onClick={() => navigate("/Connexion")}> Connexion</button>
            )}
          </div>
        );
      })}
    </div>
  );
}
