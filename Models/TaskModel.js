const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    createDate:{
        type:Date,
        default:Date.now(),
    },

    
},{versionKey:false});

const TaskModel = mongoose.model('tasks',TaskSchema);
module.exports = TaskModel ;