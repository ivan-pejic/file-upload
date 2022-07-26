const express = require("express");
const app = express();
const cors = require("cors");
const userRouter = require("./routes/users");
const filesRouter = require("./routes/files");

//path logger
app.use(logger);

function logger(req, res, next) {
  console.log(req.method + " " + req.originalUrl);
  next();
}

//route declaration
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/users", userRouter);
app.use("/files", filesRouter);

app.listen(3000);
