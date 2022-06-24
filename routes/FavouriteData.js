const express = require('express');
const jwtaccess = require('../middleware/authaccess');
const Favourite = require('../Models/Favourite');
const User = require('../Models/User');
const router = express.Router();

router.post('/add', jwtaccess, async (req, res) => {
    try {
        var id = req.userid;
        let user = await User.findById(id);
        if (!user) {
            return res.json({ status: -1 });
        }

        let fav = await Favourite.findOne({ bookId: req.body.bookid, userId: id });
        if (fav) {
            return res.json({ status: +1 });
        }

        Favourite.create({
            bookId: req.body.bookid,
            userId: id,
            bookname: req.body.bookname,
            bookauthor: req.body.author
        })
            .then(() => {
                res.json({ status: 0 });
            })
            .catch(() => {
                res.json({ status: -1 });
            })
    } catch (error) {
        res.json({ status: -2 });
    }
})

router.get('/send', jwtaccess, async (req, res) => {
    try {
        var id = req.userid;
        let fav = await Favourite.find({ userId: id });
        var data= new Array();
        for(i in fav){
            data.push({
                title:fav[i].bookname,
                author:fav[i].bookauthor,
                bookid:fav[i].bookId,
                id:fav[i]._id
            })
        }
        return res.json({ status: 0, data});
    } catch (error) {
        res.json({ status: -2 });
    }
})

router.post('/delete',jwtaccess,async(req,res)=>{
    try {
        var userid = req.userid;
        await Favourite.findOneAndRemove({_id:req.body.id,userId:userid});
        res.json({ status: 0 });
    } catch (error) {
        res.json({ status: -2 });
    }
})

module.exports = router;