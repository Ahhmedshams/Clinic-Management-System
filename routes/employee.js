const {body,param}=require("express-validator");
const express = require("express");
const validator =require("../middlewares/errorValidation")
const employeeController=require("../controller/employee");
const router = express.Router();
const mongoose = require("mongoose")
const advancedResults = require ("./../middlewares/advancedResult");
require('./../model/employee');
const employee= mongoose.model('employee');
//Without Id
router.route("/employee")
.get(advancedResults(employee),employeeController.getAllEmployees)
.post(
    [
        body("fullName").isString().withMessage("Name should be string")
        .isLength({ max: 20 }).withMessage("Length of name must be less than 20"),

        body("birth_date").isString().withMessage("Please Enter Valid Date"),

        body("email").isEmail().withMessage("Email Is Not Valid"),
        body("userName").isString().withMessage("userName should be string"),

        body("role").isString().withMessage("role should be string")
        .isLength({ max: 10 }).withMessage("Length of name must be less than 10"),

        body("salary").isNumeric().withMessage("Salary should be number"),
        
        body("phone").isString().withMessage("phone should be string")
        .isLength({min:11,max:15}).withMessage("phone length should be <16 and >11"),

        body("gender").isIn(["Male","Female"]).withMessage("gender should be Male or Female"),
        
        body("password").isString().withMessage("password should be string"),

        body("address").isObject().withMessage("address should be Object"),
        body("address.city").isString().withMessage("city must be string"),
        body("address.street").isInt().withMessage("street should be integer"),
        body("address.building").isInt().withMessage("building should be integer")
    ],
    validator,
    employeeController.addEmployee)
.patch(employeeController.updateEmployee)


//Route ID
router.route("/employee/:id")
.get(
    param("id").isInt().withMessage("Id Sould Be Integer"),
    validator,
    employeeController.getEmployeeById
)
.delete(
    param("id").isInt().withMessage("Id Sould Be Integer"),
    validator,
    employeeController.deleteChildById
)
.patch(
    param("id").isInt().withMessage("Id Sould Be Integer"),
    validator,
    employeeController.updateEmployeeById
)

module.exports=router;