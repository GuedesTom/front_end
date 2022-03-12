const User = require("../models/user");
const Content = require("../models/content");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Inscription
exports.signUp = async (req, res) => {
  try {
    let user = await User.create(req.body);
    const token = jwt.sign({ id: user.id }, process.env.PRIVATE_KEY);
    res.status(201).json({ token });
  } catch (err) {
    res.status(500).json(err);
  }
};

// Connexion
exports.login = async (req, res) => {
  try {
    let user = await User.findOne({ username: req.body.username });
    // vérifier si l'username existe
    if (user) {
      // vérifier si le mot de passe est correcte
      let isMatch = await bcrypt.compare(req.body.password, user.password);
      if (isMatch) {
        // Envoie du token JWT
        const token = jwt.sign({ id: user.id }, process.env.PRIVATE_KEY);
        res.status(200).json({ token });
      } else {
        // Mot de passe incorrect
        res.status(500).json({ message: " Mot de passe incorrect" });
      }
    }
    // username n'existe pas
    else {
      res.status(500).json({ message: "user n'existe pas" });
    }
  } catch (err) {
    res.status(400).json({ message: `Erreur pendant inscription ${err}` });
  }
};

// Vérification du Token
exports.isLoggedIn = (req, res, next) => {
  const token = req.headers.authorization.replace("Bearer ", "");
  jwt.verify(token, process.env.PRIVATE_KEY, function (err, payload) {
    if (err) {
      res.status(401).json({ message: " Unauthorized" });
    } else {
      // iat -> issued at
      req.payload = payload;
      next();
    }
  });
};

exports.modif = async (req, res) => {
  try {
    let user = await User.findById(req.payload.id);
    let content = req.params;
    user.content.push(content.id);
    await user.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.afficher = async (req, res) => {
  try {
    let user = await User.findById(req.payload.id);
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json(err);
  }
};
