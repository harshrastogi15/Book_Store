const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const express = require('express');
const path = require('path');
const connect = require('./db');
require('dotenv').config();
connect();
const apikey = process.env.API_KEY;
const port = process.env.PORT || 3001;
const app = express();
app.use(express.static(path.resolve(__dirname, 'client/build')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use(`/HarshRastogiBooksStore/api/auth`, require('./routes/auth'));
app.use(`/HarshRastogiBooksStore/api/books`, require('./routes/booksdetail'));


app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client/build', 'index.html'));
});

app.listen(port, () => {
    console.log(`server listen at port ${port}`);
});