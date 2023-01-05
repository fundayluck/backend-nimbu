const express = require("express")
const auth = require('../middlewares/requiredAuth')

const controllerUser = require('../controllers/user')
const controllerStaff = require('../controllers/staff')
const upload = require("../middlewares/upload")


const router = express.Router()

router.post('/login', controllerUser.login)
router.post("/create-user", auth, controllerUser.createUsers)
router.get('/user', auth, controllerUser.getAllUser)
router.get('/user/:userId', auth, controllerUser.getUser)
router.post('/create-account', auth, upload.single('image'), controllerStaff.createAccount)
router.get('/staff', auth, controllerStaff.getAllStaff)

module.exports = router;