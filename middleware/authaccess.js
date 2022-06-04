var jwt = require('jsonwebtoken');
require('dotenv').config();

const jwtaccess = async(req,res,next)=>{
    try {
        token = req.headers.auth_token;
        var decoded = jwt.verify(token, process.env.JWT_TOKEN);
        req.userid = decoded.id;
        next();
    } catch (error) {
        res.json({status: -1 });
    }
}

module.exports = jwtaccess;
