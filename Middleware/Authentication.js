const jwt = require('jsonwebtoken')



const Authentication =async(req,res,next)=>{
    try {
        const token = req.headers.token;
        if(!token){
        res.status(401).json({ message: "Not authorized, please login"});
        }
        // verify token
        jwt.verify(token,'taskManagement',(error,decode)=>{
            if(error){
                res.status(400).json({ message: "Not authorized, please login" })
            }else{
                req.user = decode['data']
                // console.log(req.user['email']);
                next();
            }
        });
    } catch (error) {
        console.log(error)
    }
}

module.exports = Authentication