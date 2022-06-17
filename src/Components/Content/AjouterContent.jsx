import "../../App.css";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SagagaContext } from "../../SagagaContext";
import axios from "axios";

export default function AddContent() {
  let { token } = useContext(SagagaContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [genres, setGenres] = useState("");
  const [pegi, setPegi] = useState("");
  const [user_creator, setUser_Creator] = useState("");
  const [pictureSelect, setPicture] = useState();
  const [selectedFile, setSelectedFile] = useState();
  let navigate = useNavigate();

  const changeHandlerPicture = (event) => {
    setPicture(event.target.files[0]);
  };

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  axios
    .get("/api/user", {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => {
      setUser_Creator(res.data._id);
    })

  const submitHandler = (event) => {
    const picture = pictureSelect.name;
    const filename = selectedFile.name;
    const content = {
      name,
      filename,
      description,
      picture,
      genres,
      pegi,
      user_creator,
    };
    if (name === "" || description === "" || genres === "" || pegi === "") {
      alert("Manque des champs!");
    } else {
      axios
        .post("/api/content", content, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          navigate("/");
        })
    }

    const formDataPicture = new FormData();

    formDataPicture.append("picture", pictureSelect);

    axios
      .post("/api/picture", formDataPicture, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })

    const formData = new FormData();

    formData.append("file", selectedFile);

    axios
      .post("/api/file", formData, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      submitHandler();
    }
  };

  return (
    <div id="div">
      <input
        id="name"
        className="form__input"
        type="text"
        placeholder="Nom du contenu"
        value={name}
        onChange={(event) => setName(event.target.value)}
        onKeyDown={handleKeyDown}
      />
      <label htmlFor="name" className="form__label">
        Nom du contenu
      </label>
      <input
        id="description"
        className="form__input"
        type="text"
        placeholder="Description du contenu"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        onKeyDown={handleKeyDown}
      />
      <label htmlFor="description" className="form__label">
        Description du contenu
      </label>
      <input
        id="genres"
        className="form__input"
        type="text"
        placeholder="Genres du contenu"
        value={genres}
        onChange={(event) => setGenres(event.target.value)}
        onKeyDown={handleKeyDown}
      />
      <label htmlFor="genres" className="form__label">
        Genres du contenu
      </label>
      <input
        id="pegi"
        className="form__input"
        type="number"
        placeholder="PEGI du contenu"
        value={pegi}
        onChange={(event) => setPegi(event.target.value)}
        onKeyDown={handleKeyDown}
      />
      <label htmlFor="pegi" className="form__label">
        PEGI du contenu
      </label>
      <input
        id="picture"
        className="form__input"
        type="file"
        name="picture"
        onChange={changeHandlerPicture}
        onKeyDown={handleKeyDown}
      />
      <label htmlFor="picture" className="form__label">
        Image du contenu
      </label>
      <input
        id="video"
        className="form__input"
        type="file"
        name="video"
        onChange={changeHandler}
        onKeyDown={handleKeyDown}
      />
      <label htmlFor="video" className="form__label">
        Video du contenu
      </label>
      <div className="btn-container">
        <button onClick={submitHandler}>
          <span className="text">Ajouter</span>
          <div className="icon-container">
            <div className="icon icon--left">
              <svg>
                <use xlinkHref="#arrow-right"></use>
              </svg>
            </div>
            <div className="icon icon--right">
              <svg>
                <use xlinkHref="#arrow-right"></use>
              </svg>
            </div>
          </div>
        </button>
      </div>
      <svg style={{ display: "none" }}>
        <symbol id="arrow-right" viewBox="0 0 20 10">
          <path d="M14.84 0l-1.08 1.06 3.3 3.2H0v1.49h17.05l-3.3 3.2L14.84 10 20 5l-5.16-5z"></path>
        </symbol>
      </svg>
    </div>
  );
}
