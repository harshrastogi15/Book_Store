const express = require('express');
const multer = require('multer');
const upload = require('../../middleware/uploadImage');
const Books = require('../../Models/Books');
const BooksImage = require('../../Models/BooksImage');
const path = require('path');
const fs = require('fs');

const router = express.Router();


router.post('/addbook', upload.single('img'), async (req, res) => {
    try {
        let book = await new Books({
            title: req.body.title,
            author: req.body.author,
            language: req.body.language,
            publication: req.body.publication,
            category: req.body.category,
            url: req.body.url
        })

        await book.save(async function (err, done) {
            if (err) {
                throw err;
            };
            try {
                await BooksImage.create({
                    title: req.body.title,
                    bookId: done._id,
                    img: {
                        data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
                        contentType: 'image/png'
                    }
                })

                fs.unlinkSync(path.join(__dirname + "/uploads/" + req.file.filename));
                res.json({ status: 0 });
            } catch (error) {
                console.log(error);
                res.json({ status: -1, error });
            }
        });

    } catch (error) {
        res.json({ status: -2 });
    }
});

router.post('/update/image',upload.single('img'),async (req,res)=>{
    try {
        await BooksImage.findOneAndUpdate({bookId:req.headers.id},{
            img: {
                data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
                contentType: 'image/png'
            }
        });
        fs.unlinkSync(path.join(__dirname + "/uploads/" + req.file.filename));
        res.status(200).json({status:0});
    } catch (error) {
        res.status(500).json({status:-1});
    }
})

router.post('/update/data',async(req,res)=>{
    try {
        await Books.findByIdAndUpdate({_id:req.headers.id},{
            language: req.body.language,
            publication: req.body.publication,
            category: req.body.category,
        });
        res.status(200).json({status:0});
    } catch (error) {
        res.status(500).json({status:-1});
    }
})


module.exports = router;
