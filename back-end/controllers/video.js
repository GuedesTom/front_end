const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images/profilePictures");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === "image/jpg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

app.use(express.static("public"));

app.post(
  "/changeProfilePic",
  upload.single("profilePicture"),
  function (req, res, next) {
    console.log(req.file);
    const newImage = new Image({
      profilePicture: req.file.path,
    });
    newImage.save();
  }
);
