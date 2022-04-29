import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SagagaContext } from "./SagagaContext.jsx";
import { useState } from "react";
import Accueil from "./Components/Accueil";
import Connexion from "./Components/Connexion";
import Inscription from "./Components/Inscription";
import Navbar from "./Components/Navbar";
import Content_id from "./Components/Content_id";
import Maliste from "./Components/Maliste";
import AjouterContent from "./Components/AjouterContent";
import ModifContent_Id from "./Components/ModifContent_Id";
import AdminContent from "./Components/Administration/Content";

function App() {
  const [token, settoken] = useState(localStorage.getItem("token"));
  let Provider = SagagaContext.Provider;
  return (
    <Router>
      <Provider value={{ token, settoken }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Accueil />} />
          <Route path="/Inscription" element={<Inscription />} />
          <Route path="/Connexion" element={<Connexion />} />
          <Route path="/Maliste" element={<Maliste />} />
          <Route path="/Create" element={<AjouterContent />} />
          <Route path="/Contents/:id" element={<Content_id />} />
          <Route path="/Update/:id" element={<ModifContent_Id />} />
          <Route path="/Admin/Content" element={<AdminContent />} />
        </Routes>
      </Provider>
    </Router>
  );
}

export default App;
