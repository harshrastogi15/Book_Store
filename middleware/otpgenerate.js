const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

const createotp = ()=>{
    let otp =``;
    for (let index = 0; index < 6; index++) {
        otp += `${Math.floor(Math.random()*10)}`;        
    }
    // console.log(otp); 
    return otp;
}

module.exports = createotp;