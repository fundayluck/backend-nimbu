const jwt = require("jsonwebtoken");
const User = require('../models/user')

module.exports = (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).send({ error: "you must be log in!" });
    }

    const token = authorization.replace("Bearer ", "");
    jwt.verify(token, "MY_SECRET_KEY", async (err, payload) => {
        if (err) {
            return res.status(401).send({ error: "you must be log in!" });
        }

        const { userId } = payload;

        const user = await User.findById(userId);
        req.user = user;
        next();
    });
};