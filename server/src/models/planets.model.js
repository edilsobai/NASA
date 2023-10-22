//DEPENDENCIES
const { parse } = require("csv-parse");
const fs = require("fs");
const path = require("path");

//planets SCHEMA
const planets = require("./planets.mongo") 

//kepler planets
const habitablePlanets = [];

// FUNCTION for finding habitable planets
function isHabitablePlanet(planet) {
  return planet["koi_disposition"] === "CONFIRMED" &&
    planet["koi_insol"] > 0.36 &&
    planet["koi_insol"] < 1.11 &&
    planet["koi_prad"] < 1.6
  
}

// FUNCTION for reading data and  saving planets in a database(mongoDB) 
function loadPlanetsData() {
  return new Promise((resolve, reject) => {
    fs.createReadStream(path.join(__dirname, '..', '..', 'data', 'kepler_data.csv'))
      .pipe(parse({
        comment: '#',
        columns: true,
      }))
      .on('data', async (data) => {
        if (isHabitablePlanet(data)) {
          savePlanet(data);
        }
      })
      .on('error', (err) => {
        console.log(err);
        reject(err);
      })
      .on('end', async () => {
        const countPlanetsFound = (await getAllPlanets()).length;
        console.log(`${countPlanetsFound} habitable planets found!`);
        resolve();
      });
  });
}


//FUNCTION for getting the names of all planets from the database
async function getAllPlanets(){
    return await planets.find({},{
      "_id": 0,
      "__v": 0 })
}

//FUNCTION for saving planets in a database 
async function savePlanet(planet) {
  try {
    await planets.updateOne({
      keplerName: planet.kepler_name,
    }, {
      keplerName: planet.kepler_name,
    }, {
      upsert: true,
    });
  } catch(err) {
    console.error(`Could not save planet ${err}`);
  }
}

module.exports = {
  getAllPlanets,
  loadPlanetsData
};
