require("dotenv").config()
const { MONGODB_URI } = process.env
const mongoose = require('mongoose')
const config = { useNewUrlParser: true, useUnifiedTopology: true }

mongoose.set('strictQuery', true)
mongoose.connect(MONGODB_URI, config)
mongoose.connection
    .on("open", () => console.log("You are connected to mongo"))
    .on("close", () => console.log("You are disconnected to mongo"))
    .on("error", (error) => console.log(error))

module.exports = mongoose