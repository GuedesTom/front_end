let express = require("express");
const router = express.Router();
const controle = require("../controllers/upload")

router.get("/:id", controle.download);
router.post("/", controle.upload);

module.exports = router;
