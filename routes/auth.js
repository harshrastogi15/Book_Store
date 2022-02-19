const express=require('express');
const {body,validationResult}=require('express-validator');
const User=require('../Models/User');
const router=express.Router();

router.post('/sign',[body('email').isEmail(),body('password').isLength({min:5}),body('phone').isLength({min:10})],async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {       
        const newUser = User(req.body);
        await newUser.save();
        res.json(newUser);
    } catch (error) {
        res.send("error "+error);
    }
});

module.exports=router;