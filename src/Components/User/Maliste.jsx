import React, { useState, useEffect, useContext } from "react";
import { SagagaContext } from "../../SagagaContext";
import axios from "axios";

export default function Content_id() {
  let { token } = useContext(SagagaContext);
  // liste qui contient seulement les id des élements
  const [listIDContentUser, setlistIDContentUser] = useState([]);
  // liste qui contient la contenue complet de tous les élements
  const [listContent, setlistContent] = useState([]);

  // récupere la liste d'ID du contenue de chaque user
  useEffect(() => {
    function getUserContent() {
      const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };
      axios
        .get("/api/user", config)
        .then((res) => setlistIDContentUser(res.data.content))
        .catch((err) => console.log(err.response));
    }
    getUserContent();
  }, [token]);

  // une fois la liste d'id récuperer, ce useEffect ce déclanche pour récuperer chaque contenue avec son id
  useEffect(() => {
    listIDContentUser.forEach((idContent) => {
      axios
        .get(`/api/content/${idContent}`)
        .then((res) => {
          // on concatène le résultat qu'on viens d'obtenir avec les autres résultat précedement récuperer
          setlistContent((listContent) => [res.data, ...listContent]);
        })
        .catch((err) => console.log(err.response));
    });
  }, [listIDContentUser]);

  return (
    <div>
      {listContent.map((content) => {
        console.log(content);
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
          </div>
        );
      })}
    </div>
  );
}