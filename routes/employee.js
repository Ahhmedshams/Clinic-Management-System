const { body, param } = require("express-validator");
const express = require("express");
const validator = require("../middlewares/errorValidation")
const employeeController = require("../controller/employee");
const router = express.Router();
const mongoose = require("mongoose")
const advancedResults = require("./../middlewares/advancedResult");
require('./../model/employee');
const employee = mongoose.model('employee');



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

module.exports = router;