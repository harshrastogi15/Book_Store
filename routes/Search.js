const express = require('express');
const Books = require('../Models/Books');
const routes = express.Router();

routes.post('/find',async(req,res)=>{
    try {
        var query = {};
        
        if(req.body.category !== 'All'){
            query['category'] = req.body.category;
        }
        if(req.body.title.length>0){
            query['title'] = { $regex: `${req.body.title}`, $options: 'i' };
        }
        if(req.body.author.length>0){
            query['author'] = { $regex: `${req.body.author}`, $options: 'i' };
        }
        var data  = await Books.find(query).sort({ _id: -1 })
        res.json({status:0, data});
    } catch (error) {
        res.json({status:-2});
    }
})

module.exports = routes;
