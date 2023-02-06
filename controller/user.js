const { json, request, response } = require('express');
const expressAsyncHandler = require('express-async-handler');
const mongoose = require('mongoose');
const ErrorResponse = require('./../utils/errorResponse')

require('./../model/user');
require('./../model/employee')
const UserSchema = mongoose.model("users");
const EmployeeSchema = mongoose.model("employee");


exports.getAllUsers = (request, response, next) => {
    response.status(200).json(response.advancedResults)
}


exports.addUser = (request, response, next) => {
    let newUser = new UserSchema({
        _id: request.body.id,
        fullName: request.body.fullName,
        email: request.body.email,
        password: request.body.password,
        phone: request.body.phone,
        role: request.body.role
    })
    newUser.save()
        .then(result => {
            if (request.body.role == 'employee') {
                let newEmp = new EmployeeSchema({
                    hireDate: new Date().toLocaleDateString(),
                    birth_date: request.body.birth_date,
                    salary: request.body.salary,
                    user: result.id
                })
                newEmp.save()
            } else if (request.body.role == 'patient') {

            } else {

            }
            response.status(201).json(result);
        })
        .catch(error => next(error))
}
exports.updateUser = (request, response, next) => {
    UserSchema.updateOne({
        _id: request.body.id,
    }, {
        $set: {
            fullName: request.body.fullname,
            email: request.body.email,
            password: request.body.password,
            phone: request.body.phone,
            role: request.body.role
        }
    })
        .then(result => {
            if (result.matchedCount == 0) {
                throw new Error("This user is not found");
            } else if (result.modifiedCount == 0) {
                response.status(200).json({ "message": "No update Occured" })
            } else {
                response.status(200).json({ "message": "User is updated" })
            }
        })
        .catch(error => next(error))
}
exports.getUserByID = (request, response, next) => {
    UserSchema.findById(request.params.id)
        .then((data) => {
            response.status(200).json(data)
        })
        .catch(error => next(error))
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