const { Schema, model } = require("mongoose")

const launchesSchema = new Schema({
    flightNumber: { type: Number, required: true, unique: true },
    mission: {type: String, required: true},
    rocket: {type: String, required: true},
    launchDate: {type: Date},
    target: { type: String, required: true },
    customers:{ type: [ String ], required: true } ,
    upcoming: { type: Boolean, require: true, default: true} ,
    succes: { type: Boolean, require: true, default: true}
})

module.exports = model("Launch", launchesSchema)