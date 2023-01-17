const express = require("express")
const auth = require('../middlewares/requiredAuth')

const controllerUser = require('../controllers/user')
const controllerStaff = require('../controllers/staff')
const upload = require("../middlewares/upload")


const router = express.Router()

router.post('/login', controllerUser.login)
router.post("/create-user", auth, controllerUser.createUser)
router.get('/user', auth, controllerUser.getAllUser)
router.get('/user/:userId', auth, controllerUser.getUser)
router.post('/create-account', auth, upload.single('image'), controllerStaff.createStaff)
router.get('/staff', auth, controllerStaff.getAllStaff)
router.get('/staff/:staffId', auth, controllerStaff.getStaff)
router.put('/staff/:staffId/edit', auth, controllerStaff.editStaff)
router.get('/nip', auth, controllerStaff.getStaffWithoutAccount)
router.get('/delete/:staffId', auth, controllerStaff.deleteUser)

module.exports = router;