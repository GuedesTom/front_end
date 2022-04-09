let express = require("express");
const router = express.Router();
const controle = require("../controllers/content");
const userController = require("../controllers/user");

router.post("/", userController.isLoggedIn, controle.create);
router.get("/", controle.afficher);
router.get("/:id", controle.afficherid);
router.patch("/:id", userController.isLoggedIn, controle.modif);
router.delete("/:id", userController.isLoggedIn, controle.supp);

module.exports = router;
