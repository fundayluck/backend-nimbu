require('dotenv').config()
const { PORT, NODE_ENV } = process.env
const express = require('express')
const app = express()
const mongoose = require('./db/conn')
const morgan = require('morgan')
const cors = require('cors')
const corsOptions = require('./config/cors')
const auth = require('./routes/user')

app.use(NODE_ENV === "production" ? cors(corsOptions) : cors())
app.use(morgan("tiny"))
app.use(express.json())
app.use(express.static("public"))

app.use("/auth", auth)
app.get("/", (req, res) => {
    res.send("hello world")
})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})