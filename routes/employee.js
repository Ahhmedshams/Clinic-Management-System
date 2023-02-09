const express = require("express");
const validator =require("../middlewares/errorValidation")
const validation = require("./../middlewares/validations");
const employeeController=require("../controller/employee");
const advancedResults = require ("./../middlewares/advancedResult");
require('./../model/employee');
const mongoose = require("mongoose")
const allowedUsers =require("./../middlewares/AuthorizeRole");

const employee= mongoose.model('employee');

const router = express.Router();
//Without Id
router.route("/employee")
.get(allowedUsers.checkWithRole("admin"),advancedResults(employee,{ path:"clinicId" , select: { _id:0 , name:1 } }),employeeController.getAllEmployees)
.post(allowedUsers.checkWithRole("admin"),validation.employeePost,validator,employeeController.addEmployee)


//Route ID
router.route("/employee/:id")
.get(allowedUsers.checkWithRole("admin","employee"),
    validation.paramIdInt,validator,employeeController.getEmployeeById)
.delete(allowedUsers.checkWithRole("admin"),
    validation.paramIdInt,validator,employeeController.deleteById)
.patch(allowedUsers.checkWithRole("admin","employee"),
    validation.paramIdInt,validator,employeeController.updateEmployee)

module.exports=router;