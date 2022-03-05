const express= require('express');
const connect = require('./db');
connect();
const port= process.env.PORT || 3000;
const app=express();

app.use(express.json());
app.use('/api/auth',require('./routes/auth'));
app.use('/api/books',require('./routes/booksdetail'));


app.get('/',(req,res)=>{
    res.send("hello");    
})




app.listen(port,()=>{
    console.log(`server listen at port ${port}`);
});