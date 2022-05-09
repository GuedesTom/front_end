import React, { useState, useEffect } from "react";
import Modal, { useModalState } from "react-simple-modal-provider";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function ContentId({ children }) {  
  const { isOpen, setOpen } = useModalState();
  const { id } = useParams();
  const [contentAAfficher, setcontentAAfficher] = useState({});
  useEffect(() => {
    axios
      .get("/api/content/" + id)
      .then((res) => setcontentAAfficher(res.data))
      .catch((err) => console.log(err.response));
  });
  return (
    <Modal
      id={"BasicModal"}
      consumer={children}
      isOpen={isOpen}
      setOpen={setOpen}
    >
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
    </Modal>
  );
}
