
const express= require("express");
const mongoose = require('mongoose');
const controller = require("./../controller/report");
const validator = require("./../middlewares/errorValidation");
const advancedResults = require ("./../middlewares/advancedResult");
const { route } = require("./invoice");


const router = express.Router();

router.route("/report")
.get(controller.getAllreport)

router.route("/report/:date")
.get(controller.getDailyreport)



module.exports=router;