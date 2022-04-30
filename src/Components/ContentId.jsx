import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";
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

        <ReactPlayer
          width="100%"
          height="100%"
          url={contentAAfficher.url}
          controls
          muted
          config={{
            youtube: {
              playerVars: { showinfo: 1 },
            },
          }}
        />

        <p>{contentAAfficher.description}</p>
      </li>
    </div>
  );
}
