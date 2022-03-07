const Content = require("../models/content");
const User = require("../models/user");

exports.afficher = async (req, res) => {
  try {
    let contents = await Content.find().limit(10);
    res.status(200).json(contents);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.create = async (req, res) => {
  try {
    let user = await User.findById(req.payload.id);
    console.log(req.body);
    let content = await Content.create(req.body);
    user.content_create.push(content);
    await user.save();
    res.status(201).json(content);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.afficherid = async (req, res) => {
  try {
    let { id } = req.params;
    let content = await Content.findById(id);
    res.status(200).json(content);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.modif = async (req, res) => {
  try {
    let { id } = req.params;
    let content = await Content.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(content);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.supp = async (req, res) => {
  try {
    let { id } = req.params;
    let content = await Content.findByIdAndDelete(id);
    let user = await User.findById(req.payload.id);
    user.content = user.content_create.filter((item) => item != id);
    await user.save();
    res.status(200).json(content);
  } catch (err) {
    res.status(400).json(err);
  }
};
