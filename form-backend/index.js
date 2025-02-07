const express = require('express');
const http = require('http');

let app = express();

app.use(express.json());

const cors =require('cors');
const { default: mongoose } = require('mongoose');
const router = require('./App/Router');
app.use(cors({methods: ['GET', 'POST'], // Allowed methods
    allowedHeaders: ['Content-Type'],}));

    require('dotenv').config()

mongoose.connect(process.env.MONGO_URL);

const PORT =process.env.PORT

app.use(router)

app.get('/',(req,res)=>{
    res,send("Hello")
})

app.listen(PORT,console.log("App is running"))