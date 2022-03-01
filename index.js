let express = require("express")
let cors  = require('cors')
let https = require('https')
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

//to prevent the server from sleeping
setInterval(()=> {
    https.get("https://word-race-test.herokuapp.com/")
    https.get("https://backend-word.herokuapp.com/")
},30000)

server.use('/user',require('./mongoDbDepencies/playerData/playerData'))