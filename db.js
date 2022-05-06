const mongoose = require('mongoose');
require('dotenv').config();
// const url=`mongodb://localhost:27017/bookStore?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false`;
const url = process.env.URL_DB;


const connect = async()=>{
    
    try {
        console.log("Try to database connected");
        await mongoose.connect(url);
        console.log("database connected");
    } catch (error) {
        console.log("error "+error);
    }

}

module.exports=connect;