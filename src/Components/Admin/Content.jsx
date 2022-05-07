import "../../App.css";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { SagagaContext } from "../../SagagaContext";

export default function AdminContent() {
  let { token } = useContext(SagagaContext);
  const [listAAfficher, setlistAAfficher] = useState([]);
  let navigate = useNavigate();

  const updateContent = (id) => {
    navigate(`/Update/${id}`);
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
            <li id="title">{content.name}</li>
            <button
              onClick={() => updateContent(content._id)}
              class="custom-btn btn-6"
            >
              Modifier
            </button>
          </div>
        );
      })}
    </div>
  );
}
