const express = require("express");
const trackRoute = express.Router();
const multer = require("multer");

const mongodb = require("mongodb");
const MongoClient = require("mongodb").MongoClient;
const ObjectID = require("mongodb").ObjectID;

/**
 * NodeJS Module dependencies.
 */
const { Readable } = require("stream");

/**
 * Connect Mongo Driver to MongoDB.
 */
let db;
MongoClient.connect(
  "mongodb+srv://admin:admin@cluster0.lk2nh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  (err, database) => {
    if (err) {
      console.log(
        "MongoDB Connection Error. Please make sure that MongoDB is running."
      );
      process.exit(1);
    }
    console.log("Connected to MongoDB.");
    db = database;
  }
);

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

exports.upload = async (req, res) => {
  const storage = multer.memoryStorage();
  const upload = multer({
    storage: storage,
    limits: { fields: 1, fileSize: 6000000, files: 1, parts: 2 },
  });
  upload.single("track")(req, res, (err) => {
    if (err) {
      console.log(err);
      return res
        .status(400)
        .json({ message: "Upload Request Validation Failed" + err });
    } else if (!req.body.name) {
      return res.status(400).json({ message: "No track name in request body" });
    }

    let trackName = req.body.name;

    // Covert buffer to Readable Stream
    const readableTrackStream = new Readable();
    readableTrackStream.push(req.file.buffer);
    readableTrackStream.push(null);


    let bucket = new mongodb.GridFSBucket(db, {
      bucketName: "tracks",
    });

    let uploadStream = bucket.openUploadStream(trackName);
    let id = uploadStream.id;
    readableTrackStream.pipe(uploadStream);

    uploadStream.on("error", () => {
      console.log(uploadStream)
      return res.status(500).json({ message: "Error uploading file" });
    });

    uploadStream.on("finish", () => {
      return res.status(201).json({
        message:
          "File uploaded successfully, stored under Mongo ObjectID: " + id,
      });
    });
  });
};
