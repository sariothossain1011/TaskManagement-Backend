const UserModel = require('../Models/UserModel')
const jwt =require('jsonwebtoken')

// REGISTRATION 

const registration= async(req,res)=>{
    let reqBody = req.body ;
    try {
        await UserModel.create(reqBody,(error,data)=>{
            if(error){
                res.status(200).json({status:"fail",data:error})
            }else{
                res.status(200).json({status:"success",data:data})
            }
        })
    } catch (error) {
        console.log(error)
    }
}


const login = async(req,res)=>{
    let reqBody = req.body ;
    try {
        await UserModel.aggregate([
            {$match:reqBody},
            {$project:{_id:0,email:1,firstName:1,lastName:1,mobile:1,photo:1}}
        ],(error,data)=>{
            if(error){
                res.status(400).json({status:"login fail",data:error})
            }else{
                if(data.length>0){
                    let Payload = {exp:Math.floor(Date.now()/5000 * 24*60*60),data:data[0]};
                    let token = jwt.sign(Payload,process.env.SECRET_KEY);
                    res.status(200).json({status:"login success",token:token,data:data[0]});
                }else{
                    res.status(400).json({status:"unauthorized user"})
                }
            }
        })
    
    } catch (error) {
        res.status(400).json({status:"unauthorized user"})
    }
}

const profileUpdate =async(req,res)=>{
    let email = req.user['email'];
    let reqBody = req.body ;
    try {
        await UserModel.updateOne({email:email},reqBody,(error,data)=>{
            if(error){
                res.status(400).json({status:"fail",data:error})
            }else{
                res.status(200).json({status:"success",data:data})
            }
        })
    } catch (error) {
        console.log(error)
    }
}

// const profileDetails =async(req,res)=>{
//     let email=req.headers['email'];
//     await UserModel.aggregate([
//         {$match:{email:email}},
//         {$project:{_id:1,email:1,firstName:1,lastName:1,mobile:1,photo:1,password:1}}
//     ],(error,data)=>{
//         if(error){
//             res.status(400).json({status:"fail",data:error})
//         }else{
//                 res.status(200).json({status:"success",data:data})
//         }
//     })
// }

const profileDetails =(req,res)=>{
    let email= req.headers['email'];
    UserModel.aggregate([
        {$match:{email:email}},
        {$project:{_id:1,email:1,firstName:1,lastName:1,mobile:1,photo:1,password:1}}
    ],(err,data)=>{
        if(err){
            res.status(400).json({status:"fail",data:err})
        }
        else {
            res.status(200).json({status:"success",data:data})
        }
    })
}

module.exports ={
    registration,
    login,
    profileUpdate,
    profileDetails,
}