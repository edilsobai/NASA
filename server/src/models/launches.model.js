const launches = new Map()

let latestFLightNumber = 100

function existsLaunchWithId(id) {
    return launches.has(id)
}

const launch = {
    flightNumber: 100,
    mission: "Kepler Exploration X",
    rocket: "Explore IS1",
    launchDate: new Date("December 27, 2030"),
    target: "Kepler-442 b",
    customer: ["Edu", "Nasa"],
    upcoming: true,
    succes: true

    
}
launches.set(launch.flightNumber, launch)

function getAllLaunches() {
    return Array.from(launches.values())
}

function addNewLaunch(launch) {
    latestFLightNumber++
    launches.set(
        latestFLightNumber, 
        Object.assign(launch, {
            flightNumber: latestFLightNumber,
            customer: ["Edu", "Nasa"],
            succes: true,
            upcoming: true,

        }
        )
    )
}

function deleteLaunchById(launchId){
    const deleted = launches.get(launchId)
    deleted.upcoming = false
    deleted.succes = false
    return deleted
}

module.exports = {
    existsLaunchWithId,
    getAllLaunches,
    addNewLaunch,
    deleteLaunchById
}