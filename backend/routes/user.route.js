const express = require('express')
const router = express.Router()
const userController = require("../controllers/user.controller")

router.post('/register', userController.userRegister)

router.post('/login', userController.userLogin)

router.post('/updatePassword/:username', userController.updatePassword)

module.exports = router