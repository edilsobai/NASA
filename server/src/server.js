//DEPENDENCIES
const http = require("http");

require("dotenv").config()

//Express application
const app = require("./app");

//MODULES
const { loadPlanetsData } = require("./models/planets.model");
const { loadLaunchData } = require("./models/launches.model") 
const { mongoConnect } = require("./services/mongo")
//PORT
const PORT = process.env.PORT || 8000;

//SERVER
const server = http.createServer(app);

//FUNCTION to start our server
async function startServer() {
  await mongoConnect()
  await loadPlanetsData();
  await loadLaunchData()

  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
  });
}

startServer();
