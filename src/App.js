import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  Outlet,
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
import axios from "axios";

const CreatorRoute = ({ user, redirectPath = "/Inscription", children }) => {
  const [admin, setAdmin] = useState("");
  const [creator, setCreator] = useState("");
  axios
    .get("/api/user", {
      headers: {
        Authorization: "Bearer " + user,
      },
    })
    .then((res) => {
      setCreator(res.data.content_creator);
      setAdmin(res.data.admin);
    })
    .catch((err) => console.log(err.response));
  if (!user && !creator) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};

const AdminRoute = ({ user, redirectPath = "/Inscription", children }) => {
  const [admin, setAdmin] = useState("");
  axios
    .get("/api/user", {
      headers: {
        Authorization: "Bearer " + user,
      },
    })
    .then((res) => {
      setAdmin(res.data.admin);
    })
    .catch((err) => console.log(err.response));
  if (!user && !admin) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};

const ProtectedRoute = ({ user, redirectPath = "/Inscription", children }) => {
  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};

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

          <Route element={<ProtectedRoute user={token} />}>
            <Route path="/Maliste" element={<Maliste />} />
            <Route path="/Contents/:id" element={<ContentId />} />
            <Route path="/User/:id" element={<ModifUser />} />
          </Route>

          <Route element={<AdminRoute user={token} />}>
            <Route path="/Admin/Content" element={<AdminContent />} />
            <Route path="/Admin/User" element={<AdminUser />} />
          </Route>

          <Route element={<CreatorRoute user={token} />}>
            <Route path="/Create" element={<AjouterContent />} />
            <Route path="/Update/:id" element={<ModifContentId />} />
          </Route>
        </Routes>
      </Provider>
    </Router>
  );
}

export default App;
