const mongoose = require("mongoose");
require("dotenv").config();


const connect = async () => {
    try {
        await mongoose.connect(process.env.DB);
        console.log("DB connection Success");
        
    } catch (err) {
        onsole.log("DB connection Failed");
    }
}

module.exports = { connect };