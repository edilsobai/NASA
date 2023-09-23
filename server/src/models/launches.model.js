//DEPENDENCIES
const axios = require("axios")

//COLLECTIONS in mongoDB
const launchesDatabase = require("./launches.mongo")
const planets = require("./planets.mongo")

const DEFAULT_FLIGHT_NUMBER = 100

const SPACE_X_URL = "https://api.spacexdata.com/v4/launches/query" 

async function loadLaunchesData() {
    const response = await axios.post(SPACE_X_URL, {    
        query: {},
        options: {
            populate:[
                {
                    path: "rocket",
                    select: {
                        name: 1
                    } 
                },
                {
                    path: "payloads",
                    select: {
                        customers: 1
                    }
                }
            ]
        
    }
        })
}


async function existsLaunchWithId(launchId) {
    return await launchesDatabase.findOne({
        flightNumber:launchId
    }) 
}

const defaultLaunch = {
    flightNumber: 100, // flight_number 
    mission: "Kepler Exploration X",
    rocket: "Explore IS1", // rocket.name
    launchDate: new Date("December 27, 2030"), //date_local
    target: "Kepler-442 b", // name
    customers: ["Edu", "Nasa"],
    upcoming: true, // upcomming
    succes: true //succes

    
}

async function getLatestFlightNum(){
    const latestLaunch = await launchesDatabase
    .findOne()
    .sort("-flightNumber")

    if(!latestLaunch){
        return DEFAULT_FLIGHT_NUMBER
    }

    return latestLaunch.flightNumber
}

async function getAllLaunches() {
    return await launchesDatabase.find({}, {"_id": 0,"__v": 0})
}

async function addNewLaunch(launch) {
   const newFlightNumber = await getLatestFlightNum() + 1;
    const newLaunch = Object.assign(launch, {
        succes: true,
        upcoming: true,
        customers: ["Edu", "Nasa"],
        flightNumber: newFlightNumber,
        }
        )
        
    await saveLaunch(newLaunch)
}

async function deleteLaunchById(launchId){
    const deleted = await launchesDatabase.updateOne({
        flightNumber:launchId
    },{
        upcoming: false,
        succes: false
    })
    console.log(deleted)
    return deleted.acknowledged === true && deleted.modifiedCount === 1 
}

async function saveLaunch(launch){
    const planet = await planets.findOne({
        keplerName: launch.target
    }) 
    if(!planet){
        throw new Error("No matching planet found")
    }
    await launchesDatabase.findOneAndUpdate({
        flightNumber: launch.flightNumber
    }, 
        launch,
    {
        upsert: true
    })
}

saveLaunch(defaultLaunch)

module.exports = {
    existsLaunchWithId,
    getAllLaunches,
    addNewLaunch,
    deleteLaunchById
}