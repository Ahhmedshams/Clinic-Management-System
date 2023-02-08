const { request, response, next } = require("express");
const mongoose = require('mongoose');
require('./../model/user');
const UserSchema = mongoose.model("users");

exports.signup = (request, response, next) => {
    let newUser = new UserSchema({
        _id: request.body.id,
        fullName: request.body.fullName,
        email: request.body.email,
        password: request.body.password,
        phone: request.body.phone,
        role: request.body.role
    });
    newUser.save()
        .then(result => {
            response.status(201).json(result);
        })
        .catch(error => next(error))
};

