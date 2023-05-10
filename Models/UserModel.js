const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
        required:true,
    },
    mobile:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    photo:{
        type:String,
        default:"https://cdn.icon-icons.com/icons2/2506/PNG/512/user_icon_150670.png"
    },
    createDate:{
        type:Date,
        default:Date.now(),
    },
    
},{versionKey:false});

const UserModel = mongoose.model('users',UserSchema);
module.exports = UserModel ;