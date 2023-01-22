const express = require('express');
const router = express.Router()
const Authentication = require('../Middleware/Authentication');
const OTPController = require('../Controllers/OTPController')

router.get('/RecoverVerifyEmail/:email',OTPController.RecoverVerifyEmail)
router.get('/RecoverVerifyOTP/:email/:otp',OTPController.RecoverVerifyOTP)
router.post('/RecoverResetPass',OTPController.RecoverResetPass)








module.exports = router ;