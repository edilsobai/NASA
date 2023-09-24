//DEPENDENCIES
const axios = require("axios")

//COLLECTIONS in mongoDB
const launchesDatabase = require("./launches.mongo")
const planets = require("./planets.mongo")

const DEFAULT_FLIGHT_NUMBER = 100

const SPACE_X_URL = "https://api.spacexdata.com/v4/launches/query" 


async function populateLaunches(){
    const response = await axios.post(SPACE_X_URL, {    
        query: {},
        options: {
            pagination: false,
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
                        "customers": 1
                    }
                }
            ]
        
        }
    })
    if(response.status !== 200){
        console.log("Problem downmoading data")
        throw new Error("Launch data download failed")
    }
    const launchDocs = response.data.docs
    for(const launchDoc of launchDocs){
        const payloads = launchDoc["payloads"]
        const customers = payloads.flatMap((payload) => {
            return payload["customers"]
        })
        const launch = {
            flightNumber: launchDoc["flight_number"],
            mission: launchDoc["name"],
            rocket: launchDoc["rocket"]["name"],
            launchDate: launchDoc["date_local"],
            upcoming: launchDoc["upcoming"],
            succes: launchDoc["success"],
            customers
        } 
        console.log(`${launch.flightNumber}, ${launch.mission}`)
        await saveLaunch(launch)
    }
}

async function loadLaunchData() {
    const firstLaunch = await findLaunch({
        flightNumber:1,
        rocket: "Falcon 1",
        mission: "FalconSat"
    }) 
    if(firstLaunch){
        console.log("Launch data already loaded!")
    }
    else{
        await populateLaunches()
    }
}


async function findLaunch(filter){
    return await launchesDatabase.findOne(filter)
}

async function existsLaunchWithId(launchId) {
    return await launchesDatabase.findOne({
        flightNumber:launchId
    }) 
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

async function getAllLaunches(skip,limit) {
    return await launchesDatabase.find({}, {"_id": 0,"__v": 0})
    .sort({
        flightNumber: 1
    })
    .skip(skip)
    .limit(limit)
}

async function saveLaunch(launch){
    await launchesDatabase.findOneAndUpdate({
        flightNumber: launch.flightNumber
    }, 
        launch,
    {
        upsert: true
    })
}

async function addNewLaunch(launch) {
    const planet = await planets.findOne({
        keplerName: launch.target
    }) 
    if(!planet){
        throw new Error("No matching planet found")
    }
   const newFlightNumber = await getLatestFlightNum() + 1;
    const newLaunch = Object.assign(launch, {
        succes: true,
        upcoming: true,
        customers: ["Edil", "Nasa"],
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




module.exports = {
    loadLaunchData,
    existsLaunchWithId,
    getAllLaunches,
    addNewLaunch,
    deleteLaunchById
}