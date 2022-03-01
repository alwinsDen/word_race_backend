let express = require("express")
let cors  = require('cors')
let server = express()
server.use(cors())

let mongodb = require("./mongodb")

server.use(express.json({extended:true}))

//connect to mongodb
mongodb()

server.listen(process.env.PORT || 8001,()=> {
    console.log("server has started")
})

server.get('/',(req,res)=> {
    res.send("This is the server for Word Race. The frontend is available at" +
        " <a href='https://word-race-test.herokuapp.com'>https://word-race-test.herokuapp.com/</a>")
})
server.use('/user',require('./mongoDbDepencies/playerData/playerData'))