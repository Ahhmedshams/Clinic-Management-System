const { json, request, response } = require('express');
const expressAsyncHandler = require('express-async-handler');
const mongoose = require('mongoose');
const ErrorResponse = require('./../utils/errorResponse')
const LoggerServices = require('./../services/loggerServices')

require('./../model/user');
require('./../model/employee')
const UserSchema = mongoose.model("users");
const EmployeeSchema = mongoose.model("employee");
const logger=new LoggerServices('user');


exports.getAllUsers = (request, response, next) => {
    logger.info(`get user list`,response.advancedResults );
    response.status(200).json(response.advancedResults)
}

exports.deleteUserByID = (request, response, next) => {
    UserSchema.findByIdAndDelete(request.params.id)
        .then((result) => {
            if (result != null) {
                response.status(200).json({ "message": "This user is deleted" })
            } else {
                throw new Error("This user is not exist")
            }
        })
        .catch(error => next(error))
}