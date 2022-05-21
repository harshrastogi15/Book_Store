const express = require('express');
const upload = require('../middleware/uploadImage');
const books = require('../Models/Books');
const BooksImage = require('../Models/BooksImage');
const router = express.Router();

router.post('/addbook', async (req, res) => {
    console.log('here');
    console.log(req.body);
    try {
        await books.create({
            title: req.body.title,
            author: req.body.author,
            language: req.body.language,
            publication: req.body.publication,
            category: req.body.category,
            url: req.body.url
        })
            .then((res) => {
                // BooksImage.create({
                //     name: req.body.title,
                //     desc: res._id,
                //     img: {
                //         data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
                //         contentType: 'image/png'
                //     }
                // })
                console.log(res);
                res.json({ status: 0 });
            })
            .catch(() => {
                res.json({ status: -1 });
            })
    } catch (error) {
        res.json({ status: -2 });
    }
});


router.get('/sendbooks/all', async (req, res) => {
    try {
        var bookdata = await books.find({});
        res.json({ status: 0, bookdata });
    } catch (error) {
        res.json({ status: -2 });
    }
})

module.exports = router;