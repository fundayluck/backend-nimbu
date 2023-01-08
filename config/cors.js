const whitelist = [
    "http://localhost:3000",
    "https://backend-nimbu.cyclic.app"
]
const corsOptions = {
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('not allowed by CORS'))
        }
    }
}

module.exports = corsOptions