
const express= require("express");
const mongoose = require('mongoose');
const controller = require("./../controller/report");
const validator = require("./../middlewares/errorValidation");
const advancedResults = require ("./../middlewares/advancedResult");
const { route } = require("./invoice");
const allowedUsers =require("./../middlewares/AuthorizeRole");


const router = express.Router();

router.route("/appointmentreport")
.get(allowedUsers.checkWithRole("admin"),controller.getAllreport)

router.route("/appointmentreport/:date")
.get(allowedUsers.checkWithRole("admin"),controller.getDailyreport)



module.exports=router;