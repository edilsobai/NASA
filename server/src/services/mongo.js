const mongoose = require("mongoose")

require("dotenv").config()

//DATA BASE CONNECTION
const MONGO_URL = process.env.MONGO_URL

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