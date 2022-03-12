import React, { useState, useEffect, useContext } from "react";
import ReactPlayer from "react-player";
import { SagagaContext } from "../SagagaContext";
import axios from "axios";

export default function Content_id() {
  let { token } = useContext(SagagaContext);
  const [listContentUser, setlistContentUser] = useState([]);

  useEffect(() => {
    axios
      .get("/api/user", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => setlistContentUser(res.data.content))
      .catch((err) => console.log(err.response));
  }, []);

  return (
    <div>
      TEST
      {listContentUser.map((content) => {
        axios
          .get(`/api/content/${content}`)
          .then((res) => {
            console.log(res.data);
            return (
              <div id="card" key={res.data._id}>
                <li id="title">
                  TEST
                  {res.data.name}
                  <ul>
                    <ReactPlayer
                      width="100%"
                      height="100%"
                      url={res.data.url}
                      controls
                      muted
                      config={{
                        youtube: {
                          playerVars: { showinfo: 1 },
                        },
                      }}
                    />
                  </ul>
                  <p>{res.data.description} </p>
                </li>
              </div>
            );
          })
          .catch((err) => console.log(err.response));
      })}
    </div>
  );
}
