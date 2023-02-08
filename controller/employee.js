const { request, response, json } = require("express");
const mongoose = require("mongoose");


require("../model/employee")
const employeeSchema = mongoose.model("employee")




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
exports.addEmployee = (request, response, next) => {
    let newEmp = new employeeSchema({
        fullName: request.body.fullName,
        hireDate: new Date().toLocaleDateString(),
        birth_date: request.body.birth_date,
        email: request.body.email,
        salary: request.body.salary,
        phone: request.body.phone,
        gender: request.body.gender,
        password: request.body.password,
        clinicId:request.body.clinicId,
        address: request.body.address
    });
    newEmp.save()
        .then(result => {
            response.status(201).json(result)
        }).catch(err => next(err))
}



//Update Employee By Id In Body
exports.updateEmployee = (request, response, next) => {
    employeeSchema.updateOne({
        _id: request.body.id
    },
        {
            $set: {
                fullName: request.body.fullName,
                hireDate: request.body.hireDate,
                birth_date: request.body.birth_date,
                email: request.body.email,
                salary: request.body.salary,
                phone: request.body.phone,
                gender: request.body.gender,
                password: request.body.password,
                clinicId:request.body.clinicId,
                address: request.body.address
            }
        }).then(result => {
            response.status(201).json(result)
        })
        .catch(error => next(error))
}




//Update Employee By Id In params
exports.updateEmployeeById = (request, response, next) => {
    employeeSchema.updateOne({ _id: request.params.id },
        {
            $set: {
                fullName: request.body.fullName,
                hireDate: request.body.hireDate,
                birth_date: request.body.birth_date,
                email: request.body.email,
                salary: request.body.salary,
                phone: request.body.phone,
                gender: request.body.gender,
                password: request.body.password,
                clinicId:request.body.clinicId,
                address: request.body.address
            }
        }).then(result => {
            response.status(201).json(result)
        })
        .catch(error => next(error))
}




//Delete Employee By Id
exports.deleteChildById=(request,response,next)=>{
    employeeSchema.deleteOne(
        {
            _id:request.params.id
        })
    .then(data=>response.status(201).json(
        {
            message:'Deleted'
        }))
}
