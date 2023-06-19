const express = require('express')
var jwt = require('jsonwebtoken');
require('dotenv').config();
const router = express.Router();

let adminKey = process.env.ADMINKEY;
let adminID = process.env.ADMINID;

router
    .route('/login')
    .post((req, res) => {
        try {
            if (req.body.adminId != adminID || req.body.adminKey != adminKey) {
                return res.status(400).json({ status: -1 });
            }
            data = {
                id: adminID
            }
            var authtoken = jwt.sign(data, process.env.JWT_TOKEN);
            res.status(200).json({ status: 0, authtoken });

        } catch (error) {
            res.status(500).json({ status: -2,});
        }
    })

module.exports = router
