let mongoose = require("mongoose")

const mongodb = () => {
    mongoose.connect("mongodb+srv://admin:admin@cluster0.kwagt.mongodb.net/word_race?retryWrites=true&w=majority",
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
        function (err) {
            if (err) throw err;
            console.log("Database has switched on.");
        }
    )
}

module.exports = mongodb;