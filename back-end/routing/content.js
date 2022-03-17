let express = require("express");
const router = express.Router();
const controle = require("../controllers/content");
const userController = require("../controllers/user");
const storage = require("../storage");

router.post("/", userController.isLoggedIn, controle.create);
router.get("/", controle.afficher);
router.get("/:id", controle.afficherid);
router.patch("/:id", userController.isLoggedIn, controle.modif);
router.delete("/:id", userController.isLoggedIn, controle.supp);
router.post("/upload", storage.upload.single("myFile"), controle.upload);
router.get("/download", controle.download);

module.exports = router;
