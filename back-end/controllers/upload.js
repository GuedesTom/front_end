const express = require("express");
const trackRoute = express.Router();
const multer = require("multer");
require("dotenv").config();
const mongoose = require("mongoose");
const { GridFsStorage } = require("multer-gridfs-storage");
const path = require("path");

/**
 * Connect Mongo Driver to MongoDB.
 */
const mongoURI = process.env.MONGO_CONTENT_DB;

// Create mongo connection
const conn = mongoose.createConnection(mongoURI);
conn.once("open", () => {
  // Init stream
  gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "uploads",
  });
});

exports.download = async (req, res) => {
  try {
    var trackID = new Upload(req.params.trackID);
  } catch (err) {
    return res.status(400).json({
      message:
        "Invalid trackID in URL parameter. Must be a single String of 12 bytes or a string of 24 hex characters",
    });
  }
  res.set("content-type", "audio/mp3");
  res.set("accept-ranges", "bytes");

  let bucket = new mongodb.GridFSBucket(db, {
    bucketName: "tracks",
  });

  let downloadStream = bucket.openDownloadStream(trackID);

  downloadStream.on("data", (chunk) => {
    res.write(chunk);
  });

  downloadStream.on("error", () => {
    res.sendStatus(404);
  });

  downloadStream.on("end", () => {
    res.end();
  });
};

/**
 * POST /tracks
 */


// @route POST /upload
// @desc  Uploads file to DB
exports.upload = async (req, res) => {
  res.json({ file: req.file });
  //   res.redirect("/");
};
