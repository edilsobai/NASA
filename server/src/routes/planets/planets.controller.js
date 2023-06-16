const { planets, planetsObj } = require("../../models/planets.model");
async function getAllPlanets(req, res) {
  return res.status(200).json( planetsObj );
}

module.exports = {
  getAllPlanets,
};
