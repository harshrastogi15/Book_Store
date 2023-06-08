const mongoose = require('mongoose');

const schema = new mongoose.Schema(
    {
    name : {type:String,required:true},
    email: {type:String,required:true,unique:true},
    address:{type:String,required:true},
    password:{type:String,required:true},
    phone:{type:Number,required:true},
    isEmail : {type:Boolean, default: false},
    },{
        timestamps:true
    }
)

module.exports = mongoose.model('User',schema);
