const app = require('./app')


const port = process.env.PORT || 6001
app.listen(port,()=>{
    console.log(`Server is runing at http://localhost:${port}`)
})