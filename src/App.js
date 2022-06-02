import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SagagaContext } from "./SagagaContext.jsx";
import { useState } from "react";
import Accueil from "./Components/Accueil";
import Connexion from "./Components/User/Connexion";
import Inscription from "./Components/User/Inscription";
import Navbar from "./Components/Navbar";
import AjouterContent from "./Components/Content/AjouterContent";
import AdminContent from "./Components/Admin/Content";
import AdminUser from "./Components/Admin/User";
import ModifUser from "./Components/User/ModifUser";
import ContentId from "./Components/Content/ContentId";
import ModifContentId from "./Components/Content/ModifContentId";
import ProtectedRoute from "./UserCheck";
import axios from "axios";
import ContentCreatorAdmin from "./Components/Content/ContentCreatorAdmin";

function App() {
  const [token, settoken] = useState(localStorage.getItem("token"));
  const [admin, setAdmin] = useState("");
  const [creator, setCreator] = useState("");
  let Provider = SagagaContext.Provider;

  if (token != null) {
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
  }
  // if (creator === "" || admin === "") {
  //   // eslint-disable-next-line no-unused-expressions
  //   token? (requete()) : (setAdmin(false), setCreator(false));
  // }
  return (
    console.log(admin + " " + creator),
    (
      <Router>
        <Provider value={{ token, settoken, admin, creator }}>
          <Navbar />
          <Routes>
            <Route path="/" element={<Accueil />} />
            <Route path="/Inscription" element={<Inscription />} />
            <Route path="/Connexion" element={<Connexion />} />

            <Route
              element={
                <ProtectedRoute redirectPath="/Inscription" isAllowed={token} />
              }
            >
              <Route path="/Contents/:id" element={<ContentId />} />
              <Route path="/User/:id" element={<ModifUser />} />
            </Route>

            <Route
              element={
                <ProtectedRoute
                  redirectPath="/Inscription"
                  isAllowed={token && admin !== false ? true : false}
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
                  isAllowed={token && (admin !== false || creator !== false) ? true : false}
                />
              }
            >
              <Route
                path="/Creator/AdminContent"
                element={<ContentCreatorAdmin />}
              />
              <Route path="/Create" element={<AjouterContent />} />
              <Route path="/Update/:id" element={<ModifContentId />} />
            </Route>
          </Routes>
        </Provider>
      </Router>
    )
  );
}

export default App;
