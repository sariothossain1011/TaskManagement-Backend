const mongoose = require('mongoose');
const URL = "mongodb+srv://ostadUser:ostadPass@cluster0.dejoiup.mongodb.net/task-management"


mongoose.connect(URL,{autoIndex:true}).then(()=>{
    console.log('MongoDB database connection successfully')
}).catch((error)=>{
    console.log('MongoDB database connection fail',error)
})