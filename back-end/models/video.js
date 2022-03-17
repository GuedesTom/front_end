const mongoose = require("mongoose");

const contentSchema = new mongoose.Schema({
  url: { type: String, Unique: true, Require: true },
});

const Video = mongoose.model("video", videoSchema);

module.exports = Video;
