import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SagagaContext } from "./SagagaContext.jsx";
import { useState } from "react";
import Accueil from "./Components/Accueil";
import Connexion from "./Components/Connexion";
import Inscription from "./Components/Inscription";
import Navbar from "./Components/Navbar";

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
        </Routes>
      </Provider>
    </Router>
  );
}

export default App;
