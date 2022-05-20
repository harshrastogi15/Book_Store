const express = require('express');
const books = require('../Models/Books');
const router = express.Router();

router.post('/addbook', async (req, res) => {
    // console.log('here');
    try {
        await books.create({
            title: req.body.title,
            author: req.body.author,
            language: req.body.language,
            publication: req.body.publication,
            category:req.body.category,
            url: req.body.url
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
});


router.get('/sendbooks',async(req,res)=>{
    try {
        var bookdata = await books.find({});
        res.json({status:0,bookdata});
    } catch (error) {
        res.json({ status: -2 });
    }
})

module.exports = router;