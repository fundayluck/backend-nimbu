const express = require("express")
const auth = require('../middlewares/requiredAuth')

const controllerUser = require('../controllers/user')
const controllerStaff = require('../controllers/staff')


const router = express.Router()

router.post('/login', controllerUser.login)
router.post("/create-user", auth, controllerUser.signup)
router.get('/user', auth, controllerUser.getAllUser)
router.post('/create-account', auth, controllerStaff.createAccount)
router.get('/staff', auth, controllerStaff.getAllStaff)

module.exports = router;