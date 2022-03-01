let express = require("express")

let server = express()

server.listen(process.env.PORT || 8001,()=> {
    console.log("server has started")
})

server.use('/',(req,res)=> {
    res.send("This the default rute")
})