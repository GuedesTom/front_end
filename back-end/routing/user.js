const express = require("express");
const controller = require("../controllers/user");
const router = express.Router();

router.get("/", controller.isLoggedIn, controller.afficher);
router.post("/signup", controller.signUp);
router.post("/login", controller.login);
router.patch("/:id", controller.isLoggedIn, controller.modif);

module.exports = router;
