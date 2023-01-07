var whitelist = [
    "http://localhost:5000",
    "https://backend-nimbu.cyclic.ap"
]
var corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) >= 0 || !origin) {
            console.log(origin);
            callback(null, true)
        } else {
            callback(new Error('not allowed by CORS'))
        }
    }
}

module.exports = corsOptions