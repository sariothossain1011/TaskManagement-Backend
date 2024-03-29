const UserModel = require('../Models/UserModel')
const jwt =require('jsonwebtoken')

// REGISTRATION 

const registration= async(req,res)=>{
    let reqBody = req.body ;
    try {
        await UserModel.create(reqBody,(error,data)=>{
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
                    let expTime = Math.floor(Date.now() / 1000) +7 * 24 * 60 * 60 ;
                    let Payload = {exp:expTime,data:data[0]};
                    let token = jwt.sign(Payload,'taskManagement');
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

const profileUpdate = async (req, res) => {
    let email = req.user['email'];
    let reqBody = req.body;
    try {
      const updatedUser = await UserModel.findOneAndUpdate({ email }, reqBody, { new: true });
      // the {new: true} option is added to return the updated document
      res.status(200).json({ status: "success", data: updatedUser });
    } catch (error) {
      console.log(error);
      res.status(400).json({ status: "fail", data: error });
    }
  };
  

const profileDetails =async(req,res)=>{
    let email=req.user['email']
    await UserModel.aggregate([
        {$match:{email:email}},
        {$project:{_id:1,email:1,firstName:1,lastName:1,mobile:1,photo:1,password:1}}
    ],(error,data)=>{
        if(error){
            res.status(400).json({status:"fail",data:error})
        }else{
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