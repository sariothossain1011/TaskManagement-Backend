const mongoose = require('mongoose');
const dotenv = require("dotenv");  //require dotenv package
dotenv.config({ path: "./config.env" }); //import config.env file

mongoose.connect(process.env.DATABASE,{
    useUnifiedTopology:true,
    useNewUrlParser: true,
    autoIndex:true
},).then(()=>{
    console.log('MongoDB database connection successfully')
}).catch((error)=>{
    console.log('MongoDB database connection fail',error)
})