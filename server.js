const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const express = require('express');
const path = require('path');
const fs = require('fs');
const connect = require('./db');
const cors  = require('cors');
const morgan = require('morgan');
require('dotenv').config();


connect();


const apikey = process.env.API_KEY;
const port = process.env.PORT || 3001;
const app = express();

app.use(morgan('dev'))
app.use(express.static(__dirname+'/'));
app.use(express.static(path.resolve(__dirname, 'client/build')));
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({limit: "10000kb", extended: true }));
app.use(express.json());
app.use(cors())

// To update
app.use(`/${apikey}/api/admin`, require('./routes/admin/adminLogin'));
app.use(`/${apikey}/api/book`, require('./routes/admin/bookUpdate'));

app.use(`/${apikey}/api/auth`, require('./routes/auth'));
app.use(`/${apikey}/api/book`, require('./routes/booksdetail'));
app.use(`/${apikey}/api/book`, require('./routes/Onebook'));
app.use(`/${apikey}/api/review`, require('./routes/review'));
app.use(`/${apikey}/api/search`, require('./routes/Search'));
app.use(`/${apikey}/api/favourite`, require('./routes/FavouriteData'));
app.use(`/${apikey}/api/bookinfo`, require('./routes/BookInfo'));
// app.use(`/${apikey}/api/email`, require('./routes/mail'));


app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client/build', 'index.html'));
});

app.listen(port, () => {
    console.log(`server listen at port ${port}`);
});
