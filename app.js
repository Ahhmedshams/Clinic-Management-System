const express = require("express");
const morgan = require("morgan");
const server = express();  //open server with http protocol  http://localhost:8080
const clinicRouter = require("./Routes/clinic");
const { default: mongoose } = require("mongoose");



// Setting DB connections
let port = process.env.PORT || "8080";

mongoose.set('strictQuery', true);
mongoose.connect("mongodb://127.0.0.1:27017/clinicDB")
    .then(() => {
        console.log("DB Connected");
        server.listen(port, () => {
            console.log("I am listening..............", port);
        });
    })
    .catch(error => {
        console.log("DB connection problem" + " " + error);
    })

//morgan Middleware
server.use(morgan('tiny'))
//convert Data to Json format
server.use(express.json())
server.use(clinicRouter);


//Routes


// second MW
server.use((request, response, next) => {
    if (true) {

    }
    response.status(404).json({ message: "Page Not Found " });

});

// Error MiddleWare
server.use((error, request, response, next) => {
    response.status(500).json({ message: "Error " + error });
});
