require('dotenv').config()
const User = require('../models/user')

const jwt = require('jsonwebtoken')
const { SECRET } = process.env



module.exports = {
    signup: async (req, res) => {
        const {
            email,
            password,
            id_staff
        } = req.body
        try {
            const user = new User({
                email,
                password,
                id_staff,
            })
            await user.save()
            res.status(200).send({
                success: true,
                data: user
            })
        } catch (error) {
            console.log(error);
            if (error.code === 11000 && error.keyPattern.email === 1) {
                return res.status(422).send({
                    success: false,
                    message: 'User email already exist!'
                })
            }
            return res.status(422).send({
                success: false,
                message: error.message
            });
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
    },
    getAllUser: async (req, res) => {
        try {
            const user = await User.find({}).populate('id_staff').populate()
            res.status(200).send(user)
        } catch (error) {
            console.log(error);
        }
    }
}




