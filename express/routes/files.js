const express = require("express");
const db = require("../db");
const router = express.Router();

//get method for all files
router
  .route("/")
  .get((req, res) => {
    db.query("SELECT * FROM Files", (err, result) => {
      if (err) res.status(401).json({ message: "Unable to get files" });
      else res.json(result);
    });
  })
  //post method for a single file
  .post((req, res) => {
    if (req.body.userId != 0)
      db.query(
        "INSERT INTO Files (userId, name) VALUES (?, ?);",
        [req.body.userId, req.body.name],
        (err, result) => {
          if (err) res.status(401).json({ message: "Unable to upload file" });
          else res.json(result);
        }
      );
  })
  .put((req, res) => {
    if (req.body.name.length > 0)
      db.query(
        "UPDATE Files SET name = ? WHERE id=?;",
        [req.body.name, req.body.id],
        (err, result) => {
          if (err) res.status(401).json({ message: "Unable to edit file" });
          else res.status(200).json(result);
        }
      );
  });

//get method for files by user id
router
  .route("/byUserId/")
  .get((req, res) => {
    if (req.query.userId != 0)
      db.query(
        "SELECT * FROM Files where userId=?",
        req.query.id,
        (err, result) => {
          if (err)
            res.status(401).json({ message: "Unable to get files for user" });
          else res.json(result);
        }
      );
  })
  //delete method for files by user id
  .delete((req, res) => {
    if (req.query.userId != 0)
      db.query(
        "DELETE FROM Files where id=? AND userId=?",
        [req.query.id, req.query.userId],
        (err, result) => {
          if (err) res.status(401).json({ message: "Unable to delete file" });
          else res.json(result);
        }
      );
  });

module.exports = router;
