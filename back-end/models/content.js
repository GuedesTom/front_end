const mongoose = require("mongoose");

const contentSchema = new mongoose.Schema({
  name: { type: String, Unique: true },
  description: String,
  genres: String,
  pegi: Number,
  like: { type: Number, Default: 0 },
  url: { type: String, Require: true },
  user_creator: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      default: {},
    },
  ],
});

const Content = mongoose.model("content", contentSchema);

module.exports = Content;
