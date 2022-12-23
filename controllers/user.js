require('dotenv').config()
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { SECRET } = process.env

module.exports = {
    signup: async (req, res) => {
        const { email, password } = req.body
        try {
            const user = new User({
                email,
                password
            })
            await user.save()
            res.status(200).send({
                success: true,
                user
            })
        } catch (error) {
            if (error.code === 11000)
                return res.status(422).send({
                    success: false,
                    message: 'User already exist!'
                })
            return res.status(422).send(error);
        }
    },
    login: async (req, res) => {
        const { email, password } = req.body
        if (!email || !password) {
            return res
                .status(421)
                .send({
                    success: false,
                    error: "username and password are required"
                });
        }
        const user = await User.findOne({ email })
        if (!user) {
            console.log("user doesn't exist!");
            return res.status(422).send({
                success: false,
                error: "invalid password or email"
            });
        }
        try {
            await User.findOne({ email })
            await user.comparePassword(password)
            const token = jwt.sign({ userId: user._id }, SECRET);
            res.status(200).send({ success: true, user, token });
        } catch (error) {
            console.log(error);
            return res.status(422).send({
                success: false,
                error: "invalid password or email"
            });
        }
    }
}




