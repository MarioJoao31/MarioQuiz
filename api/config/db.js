const mongoose = require('mongoose');
const config= require('config');
const { findByIdAndUpdate } = require('../models/User');
const db = config.get('mongoURI');

const connectDB = async () => {
    try{
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: false
            
        });
        console.log("MarioQuiz accessed!!");
    }catch (err){
        console.error(err.message);
        // Exit process with failure
        process.exit(1);
    }
};

module.exports = connectDB;