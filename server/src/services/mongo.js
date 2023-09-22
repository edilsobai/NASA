const mongoose = require("mongoose")

//DATA BASE CONNECTION
const MONGO_URL = "mongodb+srv://nasa-api:22115201@nasacluster.hgv0ntr.mongodb.net/nasa?retryWrites=true&w=majority"

mongoose.connection.once("open", () => {
  console.log("Mongoose connection is ready")
})
mongoose.connection.on("error", (err) => {
  console.error("ERROR is: ", err)
})

async function mongoConnect(){
    await mongoose.connect(MONGO_URL)
}

async function mongoDisconnect() {
    await mongoose.disconnect()
}

module.exports = {
    mongoConnect,
    mongoDisconnect
}