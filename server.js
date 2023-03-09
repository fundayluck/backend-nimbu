require('dotenv').config()
const { PORT, NODE_ENV } = process.env
const express = require('express')
const app = express()
const connectDB = require('./db/conn')
const morgan = require('morgan')
const cors = require('cors')

const whitelist = ['http://localhost:3000', 'https://nimboost.nimbu.id']

app.use(NODE_ENV === "production" ? cors({ origin: whitelist }) : cors())
app.use(morgan("tiny"))
app.use(express.json())
app.use(express.static("public"))
app.use('/upload', express.static('./upload'))
app.use('/staffPicture', express.static('./staffPicture'))

app.use("/api", require('./routes'))

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`)
    })
})