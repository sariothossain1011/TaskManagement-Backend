const express = require('express');
const router = express.Router()
const UserContorller = require('../Controllers/UserControll');
const Authentication = require('../Middleware/Authentication')


router.post('/registration',UserContorller.registration)
router.post('/login',UserContorller.login)
router.post('/profileUpdate',Authentication,UserContorller.profileUpdate)
router.get('/profileDetails',Authentication,UserContorller.profileDetails)


module.exports = router ;