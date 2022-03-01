let express = require('express')
let mongoose = require("mongoose")
let Schema = mongoose.Schema;
let route = express.Router()

//here schemas are defined
const userDataSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    level: {
        type: Array,
        required: true
    },
    score: {
        type: Array,
        required: true
    },
    solvedWords: {
        type: Number,
        required: true
    },
    gamesPlayed: {
        type: Number,
        required: true
    }

}, {timestamps: true})


const User = mongoose.model("User", userDataSchema)


route.get("/", async (req, res) => {
    res.send("This is the user URL")
})

route.post("/save", async (req, res) => {
    const user = new User({
        username: req.body.playerName,
        level: [req.body.level],
        score: [req.body.score],
        solvedWords: req.body.solvedWords,
        gamesPlayed: 1
    })
    let response = await user.save()
    res.send(response)
})

//updating exisiting player data
route.post("/update", async (req, res) => {
    const data = await User.findOne({_id: req.body.id})
    data.level = [...data.level, req.body.level]
    data.score = [...data.score, req.body.score]
    data.solvedWords = data.solvedWords + req.body.solvedWords
    data.gamesPlayed = data.gamesPlayed + 1

    let response = await data.save()
    res.send(response)
})

route.get("/scoreboard", async (req, res) => {
    const data = await User.find({});
    let respArray = []

    for (let i = 0; i < data.length; i++) {
        respArray.push({
            username: data[i].username,
            averageScore: (data[i].score.reduce((partialSum, a) => partialSum + a, 0)) / data[i].score.length,
            maxLevel: Math.max(...data[i].level),
            gamesPlayed: data[i].gamesPlayed,
            solvedWords: data[i].solvedWords
        })
    }
    respArray.sort((a, b)=> {
        return b.averageScore - a.averageScore
    })
    res.send(respArray.slice(0,10))
})
// route.post("/test", (req, res) => {
//     const user = new User(req.body)
//     user.save()
//         .then(resp => res.send(resp))
//         .catch(err => {
//             console.log(err)
//         })
// })
//
//
// //id based parameter
// route.get("/update/:id",(req,res)=> {
//     const id = req.params.id;
//     console.log(id)
// })
//
//
// // update test
// route.post("/updateData/:created",async(req,res)=> {
//     let data = await User.findOne({
//         createdAt: req.params.created
//     })
//     data.score = req.body.score
//     let response = await data.save()
//     res.send(response)
// })

module.exports = route