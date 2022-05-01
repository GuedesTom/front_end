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
      .catch((err) => console.log(err.response));
  });
  return (
    <div>
      <li>
        {contentAAfficher.name}

        <audio
          src={`/api/file/download/${contentAAfficher.filename}`}
          controls
        />

        <p>{contentAAfficher.description}</p>
      </li>
    </div>
  );
}
