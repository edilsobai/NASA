const exprses = require("express")

const { 
    httpGetAllLaunches,
    httpAddNewLaunch,
    httpDeleteLaunchById
} = require("./launches.controller")

const launchesRouter = exprses.Router()

launchesRouter.get("/", httpGetAllLaunches)
launchesRouter.post("/", httpAddNewLaunch)
launchesRouter.delete("/:id", httpDeleteLaunchById)

module.exports = launchesRouter