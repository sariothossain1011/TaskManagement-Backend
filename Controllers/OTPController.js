const UserModel = require('../Models/UserModel');
const OTPModel = require('../Models/OTPModel');
const SendEmailUtility = require('../Utility/SendEmailUtility');


exports.RecoverVerifyEmail = async(req,res)=>{
    let email = req.params.email;
    let OTPCode = Math.floor(100000 + Math.random() * 900000)
    try {
        // email account query 
        let UserCount =(await UserModel.aggregate([{$match: {email: email}}, {$count: "total"}]))
        if(UserCount.length>0){
            // OTP insert
            await OTPModel.create({email: email, otp: OTPCode})
            // send email
            let SendEmail = await SendEmailUtility(email," Your PIN Code is-" + OTPCode,"TASK MANGER PIN Verification " )
            return res.status(200).json({status:"success",data:SendEmail})
        }else{
            res.status(400).json({status:"No User Found",})
        }
    } catch (error) {
        res.status(400).json({status:"fail",data:error})
    }

}

exports.RecoverVerifyOTP = async(req,res)=>{
    let email = req.params.email;
    let OTPCode = req.params.otp;
    let status=0;
    let statusUpdate=1;
    try {
        let OTPCount =(await OTPModel.aggregate([{$match: {email: email,otp:OTPCode,status:status}}, {$count: "total"}]))
        if(OTPCount.length>0){
            let OTPUpdate = await OTPModel.updateOne({email:email,otp:OTPCode,status:status},{email:email,otp:OTPCode,status:statusUpdate});
            res.status(200).json({status:"success",data:OTPUpdate})
        }else{
            res.status(400).json({status:"fail",data:"Invalid OTP Code"})
        }
        
    } catch (error) {
        res.status(400).json({status:"fail",data:error})
    }

}

exports.RecoverResetPass = async(req,res)=>{
    let email = req.body['email']
    let OTPCode = req.body['otp']
    let NewPass=req.body['password']
    let statusUpdate=1;
    try {
        let OTPCount =(await OTPModel.aggregate([{$match: {email: email,otp:OTPCode,status:statusUpdate}}, {$count: "total"}]))
        if(OTPCount.length>0){
            let UpdatePass = await UserModel.updateOne({email:email},{password:NewPass});
            res.status(200).json({status:"success",data:UpdatePass})
        }else{
            res.status(400).json({status:"fail",data:"Invalid OTP Code"})
        }
        
    } catch (error) {
        res.status(400).json({status:"fail",data:error})
    }

}