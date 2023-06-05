const fs = require("fs");

const { parse } = require("csv-parse");
const { resolve } = require("path");
const e = require("express");

const habitablePlanets = [];

function isHabitablePlanet(planet) {
  return planet["koi_disposition"] === "CONFIRMED"
  && planet["koi_insol"] > 0.36 && planet["koi_insol"] < 1.11
  && planet["koi_prad"] < 1.6;
}


function loadPlanetsData() {
    return new Promise((resolve, resject) => {
        
        fs.createReadStream("./data/kepler_data.csv")
        .pipe(
            parse({
            comment: "#",
            columns: true,
            })
        )
        .on("data", (data) => {
            if (isHabitablePlanet(data)) {
            habitablePlanets.push(data);
            }
        })
        .on("error", (err) => {
            console.log("ERROR is: ", err);
            resject(err);
        })
        .on("end", () => {
            console.log(`${habitablePlanets.length} habitable planets found!`);
            resolve();
        });
    })
} 

module.exports = {
    loadPlanetsData,
    planets: habitablePlanets
}