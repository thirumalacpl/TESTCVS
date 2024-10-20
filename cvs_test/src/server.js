
//import express from 'express';
const express = require("express");
//import cvsRoutes from './Routes/cvsRoutes.js';
//const cvsRoutes = require("./Routes/cvsRoutes.js");
//import bodyParser from 'body-parser';
const bodyParser = require("body-parser")
const app = express();



//app.use(express.json())
app.use(bodyParser.json());

app.get("/test", (req,res) => {
    res.send("hello world");
})

const add = (a,b)=>{
    return a+b;
}

//app.use("/api/cvs", cvsRoutes);
//export {add};
module.exports={add}

app.listen(6000, function(req,res){
    console.log("server listening 6000 port")
})

