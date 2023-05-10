const express = require('express');
const router = express.Router()
const UserController = require('../Controllers/UserController');
const Authentication = require('../Middleware/Authentication')


router.post('/registration',UserController.registration)
router.post('/login',UserController.login)
router.post('/profileUpdate',Authentication,UserController.profileUpdate)
router.get('/profileDetails',Authentication,UserController.profileDetails)



module.exports = router ;