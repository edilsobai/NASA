const http = require("http");

const app = require("./app");

const { loadPlanetsData } = require("./models/planets.model");

const PORT = 5000;

const server  = http.createServer(app);


async function startServer() {
    await loadPlanetsData()

    server.listen(PORT, ()=> console.log(`running on Port: ${PORT}...`));
}


startServer()