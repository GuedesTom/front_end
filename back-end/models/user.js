const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    match: /.+\@.+\..+/,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  content_creator: {
    type: Boolean,
    required: true,
    default: false,
  },
  content: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "content",
      default: [],
    },
  ],
  content_create: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "content",
      default: [],
    },
  ],
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    let hashedPwd = await bcrypt.hash(this.password, 10);
    this.password = hashedPwd;
  }
  next();
});

const User = mongoose.model("user", userSchema);

module.exports = User;
