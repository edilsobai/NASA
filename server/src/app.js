//DEPENDENCIES
const path = require("node:path");

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

//MODULES
const api = require("./routes/api")

//Express application
const app = express();

//MIDDLEWARES
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:8000"],
  })
);
app.use(morgan("combined"));
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));

//ENDPOINTS

//API
app.use("/v1", api)

app.use("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

//EXPORTS
module.exports = app;
