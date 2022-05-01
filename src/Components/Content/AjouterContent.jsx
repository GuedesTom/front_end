import "../../App.css";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SagagaContext } from "../../SagagaContext";
import axios from "axios";

export default function AddContent() {
  let { token } = useContext(SagagaContext);
  const [name, setname] = useState("");
  const [description, setdescription] = useState("");
  const [genre, setgenre] = useState("");
  const [pegi, setpegi] = useState("");
  const [user_creator, setuser_creator] = useState("");
  const [pictureSelect, setPicture] = useState();
  const [selectedFile, setSelectedFile] = useState();
  let navigate = useNavigate();

  const changeHandlerPicture = (event) => {
    setPicture(event.target.files[0]);
    console.log(pictureSelect);
  };

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    console.log(selectedFile);
  };

  axios
    .get("/api/user", {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => {
      setuser_creator(res.data._id);
    })
    .catch((err) => console.log(err.response));

  const submitHandler = (event) => {
    const picture = pictureSelect.name;
    const filename = selectedFile.name;
    const content = {
      name,
      filename,
      description,
      picture,
      genre,
      pegi,
      user_creator,
    };
    console.log(content);
    if (name === "" || description === "" || genre === "" || pegi === "") {
      alert("Manque des champs!");
    } else {
      axios
        .post("/api/content", content, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          console.log(res.data);
          navigate("/");
        })
        .catch((err) => console.log(err.response));
    }

    const formDataPicture = new FormData();

    formDataPicture.append("picture", pictureSelect);
    console.log(pictureSelect);

    axios
      .post("/api/picture", formDataPicture, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((result) => {
        console.log("Success:", result);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    const formData = new FormData();

    formData.append("file", selectedFile);
    console.log(selectedFile);

    axios
      .post("/api/file", formData, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((result) => {
        console.log("Success:", result);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div id="div">
      <input
        id="name"
        class="form__input"
        type="text"
        placeholder="Nom du contenu"
        value={name}
        onChange={(event) => setname(event.target.value)}
      />
      <label for="name" class="form__label">
        Nom du contenu
      </label>
      <input
        id="description"
        class="form__input"
        type="text"
        placeholder="Description du contenu"
        value={description}
        onChange={(event) => setdescription(event.target.value)}
      />
      <label for="description" class="form__label">
        Description du contenu
      </label>
      <input
        id="genre"
        class="form__input"
        type="text"
        placeholder="Genre du contenu"
        value={genre}
        onChange={(event) => setgenre(event.target.value)}
      />
      <label for="genre" class="form__label">
        Genre du contenu
      </label>
      <input
        id="pegi"
        class="form__input"
        type="number"
        placeholder="PEGI du contenu"
        value={pegi}
        onChange={(event) => setpegi(event.target.value)}
      />
      <label for="pegi" class="form__label">
        PEGI du contenu
      </label>
      <input
        id="picture"
        class="form__input"
        type="file"
        name="picture"
        onChange={changeHandlerPicture}
      />
      <label for="picture" class="form__label">
        Image du contenu
      </label>
      <input
        id="video"
        class="form__input"
        type="file"
        name="video"
        onChange={changeHandler}
      />
      <label for="video" class="form__label">
        Video du contenu
      </label>
      <button onClick={submitHandler} class="custom-btn btn-6">
        Ajouter
      </button>
    </div>
  );
}
