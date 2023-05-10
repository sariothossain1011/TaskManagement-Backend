const app = require('./app')


const port = 8080
app.listen(port,()=>{
    console.log(`Server is runing at http://localhost:${port}`)
})