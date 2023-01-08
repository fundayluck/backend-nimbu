require('dotenv').config()
const { PORT, NODE_ENV } = process.env
const express = require('express')
const app = express()
const connectDB = require('./db/conn')
const morgan = require('morgan')
const cors = require('cors')
const { origin } = require('./config/cors')


app.use(NODE_ENV === "production" ? cors({ origin: 'http://localhost:3001' }) : cors())
app.use(morgan("tiny"))
app.use(express.json())
app.use(express.static("public"))
app.use('/upload', express.static('./upload'))

app.use("/api", require('./routes'))

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`)
    })
})