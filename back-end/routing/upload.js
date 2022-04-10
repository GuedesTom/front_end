let express = require("express");
const router = express.Router();
const controle = require("../controllers/upload");
const { GridFsStorage } = require("multer-gridfs-storage");
const path = require("path");
const multer = require("multer");

// Create storage engine
const storage = new GridFsStorage({
  url: process.env.MONGO_CONTENT_DB,
  file: (req, file) => {
    // format du nom du fichier
    const filename =
      path.parse(file.originalname).name +
      "-" +
      Date.now() +
      path.parse(file.originalname).ext;
    const fileInfo = {
      filename: filename,
      bucketName: "uploads",
    };
    return fileInfo;
  },
});

storages = multer({ storage });

router.get("/:id", controle.download);
router.post("/", storages.single("file"), controle.upload);

module.exports = router;
