const express = require("express")
const auth = require('../middlewares/requiredAuth')

const controller = require('../controllers/user')


const router = express.Router()

// router.use(auth)
router.post("/signup", controller.signup)
router.post('/login', controller.login)
router.get('/user', controller.getAllUser)

module.exports = router;