//DEPENDENCIES
const http = require("node:http");

const mongoose = require("mongoose")

//Express application
const app = require("./app");

//MODELS
const { loadPlanetsData } = require("./models/planets.model");

//PORT
const PORT = process.env.PORT || 5000;

//DATA BASE CONNECTION
const MONGO_URL = "mongodb+srv://nasa-api:22115201@nasacluster.hgv0ntr.mongodb.net/nasa?retryWrites=true&w=majority"

//SERVER
const server = http.createServer(app);

mongoose.connection.once("open", () => {
  console.log("Mongoose connection is ready")
})
mongoose.connection.on("error", (err) => {
  console.error("ERROR is: ", err)
})
//FUNCTION to start our server
async function startServer() {
  await mongoose.connect(MONGO_URL)
  await loadPlanetsData();

  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
  });
}

startServer();
