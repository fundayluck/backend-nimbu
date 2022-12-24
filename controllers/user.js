require('dotenv').config()
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { SECRET } = process.env

module.exports = {
    signup: async (req, res) => {
        const {
            email,
            password,
            division,
            name,
            id_employee
        } = req.body
        try {
            const user = new User({
                email,
                password,
                division,
                name,
                id_employee
            })
            await user.save()
            res.status(200).send({
                success: true,
                data: user
            })
        } catch (error) {
            if (error.code === 11000 && error.keyPattern.id_employee === 1) {
                return res.status(422).send({
                    success: false,
                    message: 'User id employee already exist!'
                })
            }
            if (error.code === 11000 && error.keyPattern.email === 1) {
                return res.status(422).send({
                    success: false,
                    message: 'User email already exist!'
                })
            }
            return res.status(422).send(error);
        }
    },
    login: async (req, res) => {
        const { email, password } = req.body
        try {
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
                return res.status(422).send({
                    success: false,
                    error: "invalid password or email"
                });
            }

            await user.comparePassword(password)
            const token = jwt.sign({ userId: user._id }, SECRET);
            res.status(200).send({
                success: true,
                token
            });
        } catch (error) {
            return res.status(422).send({
                success: false,
                error: "invalid password or email"
            });
        }
    }
}




