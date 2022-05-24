const express = require('express');
const Books = require('../Models/Books');
const router = express.Router();

router.post('/onebook/id',async(req,res)=>{
    // console.log(req.body);
    try {
        var data =  await Books.findOne({_id:req.body.id,title:req.body.title,author:req.body.author})
        // console.log(data);
        if(!data){
            return res.json({status:-1});
        }
        res.json({status:0,data});
    } catch (error) {
        res.json({status:-2});
    }
})

module.exports = router 