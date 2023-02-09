const { json, request, response } = require('express');
const expressAsyncHandler = require('express-async-handler');
const mongoose = require('mongoose');
const ErrorResponse = require('./../utils/errorResponse')
const LoggerServices = require('./../services/loggerServices')

require('./../model/user');
require('./../model/employee')
const user = mongoose.model("users");
const logger=new LoggerServices('user');


exports.getAllUsers = (request, response, next) => {
    logger.info(`get user list`,response.advancedResults );
    response.status(200).json(response.advancedResults)
}


// @desc     Delete User
// @route    DELETE /User/:id
// @access   ----

exports.deleteUser = async  (request, response, next) => {
    const userObject = await user.findById(request.params.id);
    if (!userObject) {
        return next(
          new ErrorResponse(`user not found with id of ${request.params.id}`, 404)
        );
      }
      logger.info(`delete user with id: ${request.params.id}`);
      userObject.remove();
      response.status(200).json({ success: true, messege: "Delete done successfully" })
}