const { request, response, json } = require("express");
const mongoose = require("mongoose");
const ErrorResponse = require('./../utils/errorResponse')



require("../model/employee")
const employeeSchema = mongoose.model("employee")

require('./../model/user');
const user = mongoose.model("users");



//Get All Employees
exports.getAllEmployees = (request, response, next) => {
    response.status(200).json(response.advancedResults)
}




//Get Employee By Id
exports.getEmployeeById=(request,response,next)=>{
    employeeSchema.findOne(
        { _id:request.params.id }).populate({ path:"clinicId" , select: { _id:0 , name:1 } })
        .then(data=>{
            if(data)
            response.status(200).json(data)
            else
            next(new Error("Employee doesn't exist"));
        }).catch(error=>next(error))
}




//Add New Employee
exports.addEmployee = async(request, response, next) => {
    let empExist = await employeeSchema.count({ email: request.body.email });
    if (!empExist) {
    let newEmp = new employeeSchema({
        name: request.body.name,
        hireDate: request.body.hireDate,
        birth_date: request.body.birth_date,
        email: request.body.email,
        salary: request.body.salary,
        phone: request.body.phone,
        gender: request.body.gender,
        address: request.body.address
    });
    newEmp.save()
        .then(result => {
            let newUser = new user({
                password: request.body.password,
                email: request.body.email,
                role: "employee",
                employeeRef_id: result._id
            })
            newUser.save()
            response.status(201).json(result)
        }).catch(err => next(err))
}else {
    next(new Error("This employee is already exist :) "));
}
}



//U
exports.updateEmployee = (request, response, next) => {
    user.updateOne({
        employeeRef_id: request.params.id
    }, {
        $set: {
            email: request.body.email,
            password: request.body.password,
            role: "employee"
        }
    }).then(res => {
    employeeSchema.updateOne({
        _id: request.params.id
    },
        {
            $set: {
                name: request.body.name,
                hireDate: request.body.hireDate,
                birth_date: request.body.birth_date,
                email: request.body.email,
                salary: request.body.salary,
                phone: request.body.phone,
                gender: request.body.gender,
                address: request.body.address
            }
        }).then(data => {
            if (data.matchedCount == 0) {
                next(new ErrorResponse("Not found any id match with (" + request.params.id + ") ", 404))
            } else {
                if (data.modifiedCount == 0) {
                    next(new ErrorResponse("No changes happen", 400))
                } else {
                    response.status(201).json({ success: true, message: "Update patient" })
                }
                address: request.body.address
            }
        })
        .catch(error => next(error))
})
}





//Delete Employee By Id
exports.deleteChildById=(request,response,next)=>{
    employeeSchema.deleteOne(
        {
            _id:request.params.id
        })
    .then(data=>
        {
            user.findOneAndDelete({ employeeRef_id: request.params.id })
            response.status(201).json( {message:'Deleted'})})
}
