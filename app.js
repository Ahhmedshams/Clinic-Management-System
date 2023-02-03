require('dotenv').config();
const express= require("express");
const morgan =require("morgan");
const mongoose = require("mongoose");
const date = require('date-and-time')
 
// router includes
const medicineRouter=require("./Routes/medicineRouter");

const now = new Date();
const value = date.format(now,'YYYY/MM/DD HH:mm:ss');
  
//Server
const server = express();


let port = process.env.PORT || 8080;
mongoose.set('strictQuery', true);
mongoose.connect(process.env.DB_URL)
        .then(()=>{
            server.listen(port,()=>{
                console.log(`Server Is Running In ${process.env.DB_URL}... On Port ${port}..............`)
                // Display the result
                console.log("current date and time : " + value)

            });
        })
        .catch(error=>{
            console.log(" BD Problem" + error)
        })
//morgan Middleware
server.use(morgan('tiny'))
//convert Data to Json format
server.use(express.json())


// cross domain to access from any web to my website =>(codepen)
server.use((request,response,next)=>{
    response.header("Access-Controll-Allow-Origin","*"); // access for all
    response.header("Access-Controll-Allow-Method","POST,DELETE,PUT,GET,OPTIONS"); //OPTIONS =>for detect error in browser and handle it
    response.header("Access-Controll-Allow-Headers","Content-Type,Authorization");  //handle req & response Auth & fetch
    next();
});

// AUTH

//Routes


server.use("/medicines",medicineRouter);





//Not Found Middleware
server.use((request,response,next)=>{
    response.status(404).json({data:"Not Found"});
})
//Error MiddleWare
server.use((error,request,response,next)=>{
    response.status(500).json({message:`Error ${error}`});
})