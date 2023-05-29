const express = require('express');
const { UserBookInfoAdd } = require('../middleware/mail');
const Books = require('../Models/Books');
const Userbookinfo = require('../Models/UserBookInfo');
const router = express.Router();

router.post('/addBookinfo', async (req, res) => {
    try {

        var get = await Books.findOne({title: {'$regex': `^${req.body.bookname}$`,$options:'i'}})
        if(get){
            return res.json({status:1,get});
        }
        await Userbookinfo.create({
            email: req.body.email,
            name: req.body.name,
            bookname: req.body.bookname,
            bookauthor: req.body.bookauthor
        })
            .then(async () => {
                await UserBookInfoAdd(req.body.email, req.body.name, req.body.bookname, req.body.bookauthor)
                res.json({ status: 0 });
            })
            .catch((error) => {
                res.json({ status: -1,error:error });
            })

    } catch (error) {
        res.json({ status: -2 });
    }
})


module.exports = router;
