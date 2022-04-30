import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { SagagaContext } from "./SagagaContext.jsx";
import { useState } from "react";
import Accueil from "./Components/Accueil";
import Connexion from "./Components/Connexion";
import Inscription from "./Components/Inscription";
import Navbar from "./Components/Navbar";
import Maliste from "./Components/Maliste";
import AjouterContent from "./Components/AjouterContent";
import AdminContent from "./Components/Administration/Content";
import AdminUser from "./Components/Administration/User";
import ModifUser from "./Components/ModifUser";
import ContentId from "./Components/ContentId";
import ModifContentId from "./Components/ModifContentId";
import ProtectedRoute from "./UserCheck";
import axios from "axios";

function App() {
  const [token, settoken] = useState(localStorage.getItem("token"));
  const [admin, setAdmin] = useState("");
  const [creator, setCreator] = useState("");
  let Provider = SagagaContext.Provider;

  const requete = () => {
    axios
      .get("/api/user", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setCreator(res.data.content_creator);
        setAdmin(res.data.admin);
      })
      .catch((err) => console.log(err.response));
  };
  if (creator === "" || admin === "") {
    requete();
  }
  return (
    <Router>
      <Provider value={{ token, settoken }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Accueil />} />
          <Route path="/Inscription" element={<Inscription />} />
          <Route path="/Connexion" element={<Connexion />} />

          <Route
            element={
              <ProtectedRoute
                redirectPath="/Inscription"
                isAllowed={!!token}
              />
            }
          >
            <Route path="/Maliste" element={<Maliste />} />
            <Route path="/Contents/:id" element={<ContentId />} />
            <Route path="/User/:id" element={<ModifUser />} />
          </Route>

          <Route
            element={
              <ProtectedRoute
                redirectPath="/Inscription"
                isAllowed={!!token && (admin === true)}
              />
            }
          >
            <Route path="/Admin/Content" element={<AdminContent />} />
            <Route path="/Admin/User" element={<AdminUser />} />
          </Route>

          <Route
            element={
              <ProtectedRoute
                redirectPath="/Inscription"
                isAllowed={!!token && (admin === true || creator === true)}
              />
            }
          >
            <Route path="/Create" element={<AjouterContent />} />
            <Route path="/Update/:id" element={<ModifContentId />} />
          </Route>
        </Routes>
      </Provider>
    </Router>
  );
}

export default App;
