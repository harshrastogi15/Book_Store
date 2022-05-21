const express = require('express');
const multer = require("multer");
const upload = require('../middleware/uploadImage');
const Books = require('../Models/Books');
const BooksImage = require('../Models/BooksImage');
const path = require('path');
const fs = require('fs');

const router = express.Router();

router.post('/addbook',upload.single('img'), async (req, res) => {
    console.log('here');
    // console.log(req.filename);
    try {
        let book = await new Books({
            title: req.body.title,
            author: req.body.author,
            language: req.body.language,
            publication: req.body.publication,
            category: req.body.category,
            url: req.body.url
        })

        await book.save(async function(err,done){
            if(err){
                throw err;
            };
            await BooksImage.create({
                    name: req.body.name,
                    bookId: done._id,
                    img: {
                        data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
                        contentType: 'image/png'
                    }
            })
            res.json({status:0});
        });

    } catch (error) {
        res.json({ status: -2 });
    }
});


router.get('/sendbooks/all', async (req, res) => {
    try {
        var bookdata = await Books.find({});
        res.json({ status: 0, bookdata });
    } catch (error) {
        res.json({ status: -2 });
    }
})

module.exports = router;