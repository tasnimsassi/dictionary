const express = require('express');
var cors = require('cors');
var connection = require('./connection');
const app = express() ;
const userRoute = require('./routes/user');
const productRoute = require('./routes/product');
const dashboardRoute = require('./routes/dashboard');

app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use('/user' , userRoute);
app.use('/product' , productRoute);
app.use('/dashboard' , dashboardRoute);// 

module.exports = app ;