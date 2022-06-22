const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    bookId:mongoose.Schema.Types.ObjectId,
    userId:mongoose.Schema.Types.ObjectId,
    bookname:String,
    bookauthor:String
})

module.exports = mongoose.model('favourite',schema);