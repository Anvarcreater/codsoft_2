const express = require('express');
const mongoose = require('mongoose');
const dotenv=require('dotenv');
const router=require('./routes/route');
const cors=require('cors');
const cookie=require('cookie-parser');


const app = express();

dotenv.config();
app.use(express.json());
app.use(cors({
    origin:[process.env.FRONT],
    credentials:true
}));
app.use(cookie());
app.use(router);

mongoose.connect(process.env.LOCALHOST).then(()=>{
    console.log("db connected");
}).catch((err)=>{
    console.log(err);
})

app.listen(4000,()=>{
    console.log("server is running");
})