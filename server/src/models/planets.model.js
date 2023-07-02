const { parse } = require("csv-parse");
const fs = require("node:fs");
const path = require("node:path");


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
          // console.log(data)
          habitablePlanets.push(data);
        }
      })
      .on("error", (error) => {
        console.log(error);
        reject(error);
      })
      .on("end", () => {
        console.log(`${habitablePlanets.length} habitable planets found`);
        resolve();
      });
  });
}


function getAllPlanets(){
  return habitablePlanets
}

module.exports = {
  getAllPlanets,
  loadPlanetsData
};
