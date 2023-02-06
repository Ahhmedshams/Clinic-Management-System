const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const errorHandler = require("./middlewares/error")
//Load env 
require('dotenv').config();
//Router Files
const userRouter = require("./routes/user");
const patientRouter = require("./routes/patient");
const clinicRouter = require("./routes/clinic");
const employeeRouter = require("./routes/employee");
const appointmentRouter = require("./routes/appointment");
const medicineRouter = require("./routes/medicineRouter");
const rescriptionRouter = require("./routes/rescription");
const doctorRouter = require("./routes/doctorRoute");
const invoiceRouter = require("./routes/invoice");

//Server
const server = express();


let port = process.env.PORT || 8080;
mongoose.set('strictQuery', true);
mongoose.connect(process.env.DB_URL)
    .then(() => {
        server.listen(port, () => {
            console.log(`Server Is Running In ${process.env.DB_URL} On Port ${port}`)
        });
    })
    .catch(error => {
        console.log(" BD Problem" + error)
    })

//Morgan middleware --- Logger 
server.use(morgan('tiny'))


// Body Parser (Convert body data to Json format)
server.use(express.json())

//Routes
server.use(userRouter)
server.use(patientRouter)
server.use(clinicRouter)
server.use(employeeRouter)
server.use("/appointment", appointmentRouter)
server.use("/medicines", medicineRouter);
server.use(rescriptionRouter);
server.use(doctorRouter);
server.use(invoiceRouter);



//Not Found Middleware
server.use((request, response, next) => {
    response.status(404).json({ data: "Not Found" });
})
//Error MiddleWare

server.use(errorHandler)
server.use((error, request, response, next) => {
    response.status(500).json({ message: ` ${error}` });
})