const { parse } = require("csv-parse");
const fs = require("node:fs");
const path = require("node:path");

const planets = require("./planets.mongo") 

const habitablePlanets = [];

function isHabitablePlanet(planet) {
  return planet["koi_disposition"] === "CONFIRMED" &&
    planet["koi_insol"] > 0.36 &&
    planet["koi_insol"] < 1.11 &&
    planet["koi_prad"] < 1.6
  
}

// const promise = new Promise((resolve, reject) => { resolve(42) })
// promise.then((res) => {
//
// })
//  await result = await promise;

function loadPlanetsData() {
  return new Promise((resolve, reject) => {
    fs.createReadStream(
      path.join(__dirname, "..", "..", "data", "kepler_data.csv")
    )
      .pipe(
        parse(
          { comment: "#",
           columns: true 
          }))
      .on("data", async (data) => {

        if (isHabitablePlanet(data)) {  
            savePlanet(data)
        }
      })
      .on("error", (error) => {
        console.log(error);
        reject(error);
      })
      .on("end", async () => {
        const countPlanetsFound = (await getAllPlanets()).length
        console.log(`${countPlanetsFound} habitable planets found`);
        resolve();
      });
  });
}


async function getAllPlanets(){
    return await planets.find({})
}

async function savePlanet(planet){
    try{
        await planets.updateOne({
            keplerName: planet.kepler_name
          }, {
            keplerName: planet.kepler_name
          }, {
            upsert: true
          });
          await planets.save
    }
    catch(err){
        console.log(`Could not save planets ${err}`)
    }
   
}

module.exports = {
  getAllPlanets,
  loadPlanetsData
};
