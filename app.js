require('dotenv').config();
const express= require("express");
const morgan =require("morgan");
const mongoose = require("mongoose");


//Server
const server = express();


let port = process.env.PORT || 8080;
mongoose.set('strictQuery', true);
mongoose.connect(process.env.DB_URL)
        .then(()=>{
            server.listen(port,()=>{
                console.log(`Server Is Running In ${process.env.DB_URL} On Port ${port}`)
            });
        })
        .catch(error=>{
            console.log(" BD Problem" + error)
        })
//morgan Middleware
server.use(morgan('tiny'))
//convert Data to Json format
server.use(express.json())

//Routes


//Not Found Middleware
server.use((request,response,next)=>{
    response.status(404).json({data:"Not Found"});
})
//Error MiddleWare
server.use((error,request,response,next)=>{
    response.status(500).json({message:`Error ${error}`});
})