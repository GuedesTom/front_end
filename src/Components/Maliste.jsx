/* eslint-disable array-callback-return */
import React, { useState, useEffect, useContext } from "react";
import { SagagaContext } from "../SagagaContext";
import axios from "axios";

export default function Content_id() {
  let { token } = useContext(SagagaContext);
  const [listContentUser, setlistContentUser] = useState([]);
  const [listContent, setlistContent] = useState({});

  useEffect(() => {
    function getUserContent() {
      axios
        .get("/api/user", {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => setlistContentUser(res.data.content))
        .catch((err) => console.log(err.response));
    }
    getUserContent();
  }, [listContentUser]);


  const getContent = (content) => {
    console.log(content);
    axios
      .get(`/api/content/${content}`)
      .then((res) => {
        console.log(res.data);
        setlistContent(res.data);
      })
      .catch((err) => console.log(err.response));
  };

  return (
    <div>
      {listContentUser.map((content) => {
        console.log(content);
        getContent(content);
        console.log(listContent);
        <div id="card" key={listContent._id}>
          <li id="title">
            TEST 123
            {listContent.name}
            <ul>
              <audio
                src={`/api/file/download/${listContent.filename}`}
                controls
              />
            </ul>
            <p>{listContent.description} </p>
          </li>
        </div>;
      })}
    </div>
  );
}
