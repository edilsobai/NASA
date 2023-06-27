const exprses = require("express")

const { httpGetAllLaunches} = require("./launches.controller")

const launchesRouter = exprses.Router()

launchesRouter.get("/launches", httpGetAllLaunches )

module.exports = launchesRouter