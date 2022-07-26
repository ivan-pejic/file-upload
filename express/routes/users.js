const express = require("express");
const db = require("../db");
const router = express.Router();

//get method for all users
router
  .route("/")
  .get((req, res) => {
    console.log(req.query.name, req.query.password);
    db.query("SELECT * FROM Users", (err, result) => {
      if (err) res.status(401).json({ message: "Unable to get users" });
      else res.json(result);
    });
  })
  //post method for a single user
  .post((req, res) => {
    db.query(
      "INSERT INTO Users (name, password) VALUES (?, ?);",

      [req.body.name, req.body.password],
      (err) => {
        if (err) res.status(401).json({ message: "User already exists" });
        else res.status(200).json({ message: "User created successfully" });
      }
    );
  })
  .put((req, res) => {
    db.query(
      "UPDATE Users SET password = ? WHERE id=? AND password=?;",
      [req.body.newPassword, req.body.id, req.body.oldPassword],
      (err, result) => {
        if (err) res.status(401).json({ message: "Unable to edit user" });
        else if (result.changedRows == 0) {
          res.status(204).json({ message: "Wrong password entered" });
        } else res.status(200).json(result);
      }
    );
  });
//get method for user login
router.route("/login/").get((req, res) => {
  db.query(
    "SELECT name, id FROM Users WHERE name=? AND password=?",
    [req.query.name, req.query.password],
    (err, result) => {
      if (err) res.status(401).json({ message: "Unable to login user" });
      if (result.length > 0) {
        res.status(200).json(result);
      } else res.status(401).json({ message: "User doesn't exist" });
    }
  );
});

module.exports = router;
