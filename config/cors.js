var whitelist = []
var corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('not allowed by CORS'))
        }
    }
}

module.exports = corsOptions