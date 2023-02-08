const express = require("express");
const validator =require("../middlewares/errorValidation")
const validation = require("./../middlewares/validations");
const employeeController=require("../controller/employee");
const advancedResults = require ("./../middlewares/advancedResult");
require('./../model/employee');
const mongoose = require("mongoose")

const employee= mongoose.model('employee');

const router = express.Router();
//Without Id
router.route("/employee")
.get(advancedResults(employee),employeeController.getAllEmployees)
.post( validation.employeePost,validator,employeeController.addEmployee)
.patch(validation.employeeUpdate,validator,employeeController.updateEmployee)


//Route ID
router.route("/employee/:id")
.get(
    validation.paramIdInt,validator,employeeController.getEmployeeById)
.delete(
    validation.paramIdInt,validator,employeeController.deleteChildById)
.patch(
    validation.paramIdInt,validator,employeeController.updateEmployeeById)

module.exports=router;