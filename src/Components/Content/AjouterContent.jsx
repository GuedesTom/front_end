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
  const [pictureSelected, setPictureSelected] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  const [isSelected, setIsSelected] = useState(false);
  let navigate = useNavigate();

  const changeHandlerPicture = (event) => {
    setPicture(event.target.files[0]);
    setPictureSelected(true);
    console.log(pictureSelect);
  };

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsSelected(true);
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
        type="text"
        placeholder="nom"
        value={name}
        onChange={(event) => setname(event.target.value)}
      />
      <br />
      <br />
      <input
        type="text"
        placeholder="description"
        value={description}
        onChange={(event) => setdescription(event.target.value)}
      />
      <br />
      <br />
      <input
        type="text"
        placeholder="genre"
        value={genre}
        onChange={(event) => setgenre(event.target.value)}
      />
      <br />
      <br />
      <input
        type="number"
        placeholder="pegi"
        value={pegi}
        onChange={(event) => setpegi(event.target.value)}
      />
      <br />
      <br />
      <input type="file" name="picture" onChange={changeHandlerPicture} />
      {pictureSelected ? (
        <div>
          <p>Filename: {pictureSelect.name}</p>
          <p>Size in bytes: {pictureSelect.size}</p>
          <p>
            lastModifiedDate:{" "}
            {pictureSelect.lastModifiedDate.toLocaleDateString()}
          </p>
        </div>
      ) : (
        <p>Select a file to show details</p>
      )}
      <br />
      <br />
      <input type="file" name="video" onChange={changeHandler} />
      {isSelected ? (
        <div>
          <p>Filename: {selectedFile.name}</p>
          <p>Size in bytes: {selectedFile.size}</p>
          <p>
            lastModifiedDate:{" "}
            {selectedFile.lastModifiedDate.toLocaleDateString()}
          </p>
        </div>
      ) : (
        <p>Select a file to show details</p>
      )}
      <button onClick={submitHandler}> Ajouter </button>
    </div>
  );
}
