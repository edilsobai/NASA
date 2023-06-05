const express = require("express");
const cors = require("cors"); 

const planetsRouter = require("./routes/planets/planets.router");

const app = express();

//Midllwares
app.use(cors({
    origin: "http://localhost:/3000"
}))
app.use(express.json());


//Routers
app.use(planetsRouter);

module.exports = app;