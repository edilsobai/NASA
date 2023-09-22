//DEPENDENCIES
const http = require("node:http");

//Express application
const app = require("./app");

//MODULES
const { loadPlanetsData } = require("./models/planets.model");
const { mongoConnect } = require("./services/mongo")
//PORT
const PORT = process.env.PORT || 5000;

//SERVER
const server = http.createServer(app);

//FUNCTION to start our server
async function startServer() {
  await mongoConnect()
  await loadPlanetsData();

  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
  });
}

startServer();
