const mongoose = require("mongoose");

const uploadSchema = new mongoose.Schema({
  name: { type: String, Unique: true },
  file: { type: String, Require: true },
});

const Upload = mongoose.model("upload", uploadSchema);

module.exports = Upload;
