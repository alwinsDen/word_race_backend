let mongoose = require("mongoose")
require("dotenv").config();
const mongodb = () => {
    mongoose.connect(`${process.env.MOND_ID}`,
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