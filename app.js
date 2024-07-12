//external imports
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db.js")
const mongoose  = require("mongoose");
const cookieParser = require("cookie-parser")
const path = require("path");

//internal imports
const { notFoundHander,errorHandler } = require("./middlewares/errorHandler.js");


const app = express();
dotenv.config();

//database connection: 
connectDB();

//request parsers
app.use(express.json());
app.use(express.urlencoded({extended : true}));

//set view engine 
app.set("view engine","ejs");

//set static folder
app.use(express.static(path.join(__dirname,"public")));

//parse cookies 
app.use(cookieParser(process.env.COOKIE_SECRET));

//routing 

//404 not found handler
app.use(notFoundHander);

//common errorHander
app.use(errorHandler);

app.listen(process.env.PORT,()=>{
    console.log(`app listening to port ${process.env.PORT}`);
})