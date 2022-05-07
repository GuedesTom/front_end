import "../App.css";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { SagagaContext } from "../SagagaContext";

export default function Accueil() {
  let { token } = useContext(SagagaContext);
  const [listAAfficher, setlistAAfficher] = useState([]);
  const [listIDContentUser, setlistIDContentUser] = useState([]);
  const [added, setAdded] = useState([]);
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

  useEffect(() => {
    token?
      (axios
          .get("/api/user", {
            headers: {
              Authorization: "Bearer " + token,
            },
          })
          .then((res) => {
            setlistIDContentUser(res.data.content);
            listIDContentUser.forEach((idContent) => {
              listAAfficher.forEach((element) => {
                if (idContent === element._id) {
                  setAdded([...element._id]);
                }
              });
            });
          })
          .catch((err) => console.log(err.response)))
      : (console.log("Pensez a vous connectez"));
  });

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
        // mon affichage devrait s'appliquer simplement au chargement de la page... malheureusement il boucle a l'infini...
        console.log("first");
        return (
          <div class="container">
	<div class="card">
		<figure class="card__thumb">
			<img src="https://source.unsplash.com/75S9fpDJVdo/300x510" alt="Picture by Kyle Cottrell" class="card__image">
			<figcaption class="card__caption">
				<h2 class="card__title">NASA Has Found Hundreds Of Potential New Planets</h2>
				<p class="card__snippet">NASA released a list of 219 new “planet candidates” discovered by the Kepler space telescope, 10 of which are similar to Earth’s size and may be habitable by other life forms.</p>
				<a href="" class="card__button">Read more</a>
			</figcaption>
		</figure>
	</div>
      //     <div id="card" key={content._id}>
      //       <li id="title">
      //         {content.name}
      //         <ul>
      //           <img
      //             src={`/api/picture/download/${content.picture}`}
      //             alt=""
      //             height="80px"
      //             lengt="80px"
      //           />
      //         </ul>
      //         <p>{content.description} </p>
      //       </li>

      //       <button
      //         onClick={() => details(content._id)}
      //         class="custom-btn btn-6"
      //       >
      //         Details
      //       </button>
      //       {token ? (
      //         added.forEach((element) => {
      //           element._id === content._id ? (
      //             <button class="custom-btn btn-6">
      //               <span>Deja Ajouter</span>
      //             </button>
      //           ) : (
      //             <button
      //               onClick={() => song(content._id)}
      //               class="custom-btn btn-6"
      //             >
      //               <span>Ecouter plus tard</span>
      //             </button>
      //           );
      //         })
      //       ) : (
      //         <button
      //           onClick={() => navigate("/Connexion")}
      //           class="custom-btn btn-6"
      //         >
      //           <span>Connexion</span>
      //         </button>
      //       )}
      //     </div>
      //   );
      // })}
  );
}
