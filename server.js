const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const express= require('express');
const connect = require('./db');
connect();
const port= process.env.PORT || 3000;
const app=express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());
app.use('/api/auth',require('./routes/auth'));
app.use('/api/books',require('./routes/booksdetail'));


app.get('/',(req,res)=>{
    res.send("done");    
})

app.listen(port,()=>{
    console.log(`server listen at port ${port}`);
});