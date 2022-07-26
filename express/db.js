const mysql = require("mysql");

//connection params
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "testProjekat",
});

//connecting
db.connect((err) => {
  if (err) console.log(err);
  console.log("Connected to DB");
});

module.exports = db;
