const { 
    existsLaunchWithId,
    getAllLaunches,
    addNewLaunch,
    deleteLaunchById
} = require("../../models/launches.model")

function httpGetAllLaunches(req, res) {
    return res.status(200).json(getAllLaunches())
}

function httpAddNewLaunch(req, res) {
    const launch = req.body
    if(!launch.mission || !launch.rocket || !launch.launchDate || !launch.target) {
        return res.status(400).json({error: "Missing required launch property" })
    }

    launch.launchDate = new Date(launch.launchDate)
    if(isNaN(launch.launchDate)){
        return res.status(400).json({error: "Invalid launch date"})
    }
    addNewLaunch(launch)
    return res.status(201).json(launch)    
}

function httpDeleteLaunchById(req, res) {
    const launchId = Number(req.params.id)
    if(!existsLaunchWithId(launchId)) {
        return res.status(404).json({
            error: "Launch not found"
        })
    }
    const deleted = deleteLaunchById(launchId)
    return res.status(200).json(deleted)
}

module.exports = {
    httpGetAllLaunches,
    httpAddNewLaunch,
    httpDeleteLaunchById
}