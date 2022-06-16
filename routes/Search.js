const express = require('express');
const Books = require('../Models/Books');
const routes = express.Router();

routes.post('/find',async(req,res)=>{
    try {
        console.log(req.body);
        var data  = await Books.find({title : { $regex: `${req.body.bookname}`, $options: 'i' }})
        res.json({status:0, data});
    } catch (error) {
        res.json({status:-2});
    }
})

module.exports = routes;
