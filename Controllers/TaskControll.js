const TaskModel = require('../Models/TaskModel');


const createTask = async(req,res)=>{
    let reqBody = req.body ;
        reqBody.email = req.user['email'];
    try {
        await TaskModel.create(reqBody,(error,data)=>{
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

const deleteTask = async(req,res)=>{
    let id = req.params.id ;
    let Query = { _id:id } ;
    try {
        await TaskModel.remove(Query,(error,data)=>{
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

const updateStatusTask = async(req,res)=>{
    let id = req.params.id ;
    let status = req.params.status ;
    let Query = { _id:id } ;
    let reqBody = {status:status}
    try {
        await TaskModel.updateOne(Query,reqBody,(error,data)=>{
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

const listTaskByStatus = async(req,res)=>{
    let status = req.params.status ;
    let email = req.user['email']
    try {
        await TaskModel.aggregate([
            {$match:{status:status,email:email}},
            {$project:{
                _id:1,title:1,description:1,status:1,
                createDate:{
                    $dateToString:{
                        date:"$createDate",
                        format:"%d-%m-%Y"
                    }
                }
            }}
        ],
            (error,data)=>{
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

const taskStatusCount = async(req,res)=>{
    let email = req.user['email']
    try {
        await TaskModel.aggregate([
            {$match:{email:email}},
            {$group:{_id:"$status",sum:{$count:{}}}}
        ],(error,data)=>{
            if(error){
                res.status(400).json({status:"fail",data:error})
            }else{
                res.status(200).json({status:"success",data:data})
            }
        })
    } catch (error) {
        
    }
}



module.exports = {
    createTask,
    deleteTask,
    updateStatusTask,
    listTaskByStatus,
    taskStatusCount
}