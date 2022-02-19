const mongoose = require('mongoose');

const schema = new mongoose.Schema(
    {
    title : {type:String,required:true},
    author: {type:String,required:true},
    language:{type:String,required:true},
    // seller :{type:String,required:true},
    }
)

module.exports = mongoose.model('books',schema);