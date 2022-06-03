const mongoose = require('mongoose')

const schema = mongoose.Schema({
    bookId:mongoose.Schema.Types.ObjectId,
    userId:mongoose.Schema.Types.ObjectId,
    username:String,
    bookname:String,
    star:Number,
    review:String
})

module.exports = mongoose.model('reviews',schema);