const { json } = require('express');
const expressAsyncHandler = require('express-async-handler');
const mongoose = require('mongoose');
const ErrorResponse = require('./../utils/errorResponse')

require('./../model/patient');
const patient= mongoose.model('patient');

//Re-route
exports.newAppointment = (request,response,next)=>{
    
    patient.findOne({_id:request.params.patientId})
    .then(data=>{
        if(data!=null){
            response.patientId= request.params.patientId
            next()
        }else{
            next(new ErrorResponse(`Patient doesn't exist with id of ${request.params.patientId}`,404))
        }
    }).catch(error=>{
        next(new Error(error))
    })
    
}

// @desc     Get all Patient /Sorting  
// @route    GET /patient
// @access   Public
exports.getPatients =  (request,response,next)=>{
    response.status(200).json(response.advancedResults)
}

// @desc     Get single Patient
// @route    GET /patient/:id
// @access   Public
exports.getPatient =(request,response,next)=>{
    patient.findOne({_id:request.params.id})
    .then(data=>{
        if(data!=null){
            response.status(200).json(data);
        }else{
            next(new ErrorResponse(`Patient doesn't exist with id of ${request.params.id}`,404))
        }
    })
    .catch(error=>next(new Error))
}

// @desc     Create Patient
// @route    POST /patient
// @access   ----
exports.createPatient = async (request,response,next)=>{
    let patientExist = await patient.count({ email: request.body.email });
    if (!patientExist) {
        let newPatient = new patient({
            name: request.body.name,
            gender: request.body.gender,
            age: request.body.age,
            email: request.body.email,
            password: request.body.password,
            phone: request.body.phone,
            address: request.body.address,
        })
        newPatient.save()
            .then(result => {
                let newUser = new User({
                    password: request.body.password,
                    email: request.body.email,
                    role: "patient",
                    patientRef_id: result._id
                })
                newUser.save()
                response.status(201).json(result)
            })
            .catch(error => {
                console.log(error);
                next(error);
            })
    } else {
        next(new Error("This patient is already exist!"));
    }
   
}

// @desc     Update Patient
// @route    PATCH /patient/:id
// @access   ----
exports.updatePatient =(request,response,next)=>{
    
    if (Object.keys(request.body).length === 0) {
        next(new ErrorResponse("Empty data", 400))
    }

    User.updateOne({
        patientRef_id: request.params.id
    }, {
        $set: {
            email: request.body.email,
            password: request.body.password,
            role: "patient"
        }
    }).then(res => {

        patient.updateOne({
            _id: request.params.id
        }, {
            $set: {
                name: request.body.name,
                sex: request.body.gender,
                age: request.body.age,
                email: request.body.email,
                password: request.body.password,
                phone: request.body.phone,
                address: request.body.address,
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
            }
        })
    })
   
}

// @desc     Delete Patient
// @route    DELETE /patient/:id
// @access   ----
exports.deletePatient = (request, response, next) => {
    User.deleteOne({ patientRef_id: request.params.id }).then((res) => {
        patient.deleteOne({ _id: request.params.id })
            .then(data => {
                if (data.deletedCount == 0) {
                    next(new ErrorResponse("Not found any id match with (" + request.params.id + ") ", 404))
                } else {
                    User.findOneAndDelete({ patientRef_id: request.params.id })
                    response.status(200).json({ success: true, messege: "Delete done successfully" })

                }
            }).catch(error => next(new ErrorResponse()))
    })
}