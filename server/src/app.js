//DEPENDENCIES
const path = require("node:path");

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

//ROUTES
const planetsRouter = require("./routes/planets/planets.router")
const launchesRouter = require("./routes/launches/launches.router")

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
app.use("/planets", planetsRouter )
app.use("/launches", launchesRouter )
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

//EXPORTS
module.exports = app;
