const express=require('express');
// const { default: mongoose } = require('mongoose');
const books=require('../Models/Books');
const router=express.Router();

router.post('/',async(req,res)=>{
    try {       
        const newbook = books(req.body);
        await newbook.save();
        res.json(newbook);
        
    } catch (error) {
        res.send("error "+error);
    }
});

module.exports=router;