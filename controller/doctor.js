const express = require("express")
const mongoose = require("mongoose");
const ErrorResponse = require('./../utils/errorResponse')
require("./../model/doctor");
require('./../model/user');
const doctorSchema = mongoose.model("doctors");
const user= mongoose.model('users');

// @desc     reRoute
exports.reRoute = (request, response, next) => {
    doctorSchema.findOne({ _id: request.params.doctorId })
        .then(data => {
            if (data != null) {
                request.doctorId = request.params.doctorId
                next()
            } else {
                next(new ErrorResponse(`doctor doesn't exist with id of ${request.params.doctorId}`, 404))
            }
        }).catch(error => {
            next(new Error(error))
        })
}

exports.getAllDoctors = (request, response, next) => {
    response.status(200).json(response.advancedResults)
}

exports.addNewDoctor=async(request,response,next)=>{
    let doctorExist = await doctorSchema.count({ email: request.body.email });
    if (!doctorExist) {
    
    let newDoctor= new doctorSchema({
        name: request.body.name,
        gender: request.body.gender,
        email: request.body.email,
        image:request.file.filename,
        phone: request.body.phone,
        address: request.body.address,
        speciality: request.body.speciality,
        yearsOfExperience: request.body.yearsOfExperience,
        calender: request.body.calender,
        clinicId: request.body.clinicId,
        appointmentId: request.body.appointmentId,
        price: request.body.price
    });
    newDoctor.save()
            .then((result)=>{
                let newUser = new user({
                    password: request.body.password,
                    email: request.body.email,
                    role: "doctor",
                    doctorsRef_id: result._id
                })
                newUser.save()
                response.status(200).json({message:"Doctor added successfully",result })
            })
            .catch(error=>{next(error)})
}else {
    next(new Error("This doctor is already exist!"));
}

}



exports.updateDoctor=(request,response,next)=>{
    user.updateOne({
        doctorsRef_id: request.params.id
    }, {
        $set: {
            email: request.body.email,
            password: request.body.password,
            role: "doctor"
        }
    }).then(res => {

       doctorSchema.updateOne(
        {_id: request.params.id},
        {$set: {
            name: request.body.name,
            gender: request.body.gender,
            email: request.body.email,
            image:request.file.filename,
            phone: request.body.phone,
            address: request.body.address,
            speciality: request.body.speciality,
            yearsOfExperience: request.body.yearsOfExperience,
            calender: request.body.calender,
            clinicId: request.body.clinicId,
            appointmentId: request.body.appointmentId,
            price: request.body.price
        }},
        {}
        )
        .then(result=>{
            if(result.matchedCount==0){
                throw new Error("This doctor is not exist");
            }
            else{
                response.status(200).json({message:"Doctor updated successfully"})
            }
        })
        .catch(error=>{next(error)})
    })
}





exports.getDoctorById = (request, response, next) => {
    doctorSchema.findOne({ _id: request.params.id })
        .then((data) => {
            if (data != null) {
                response.status(200).json(data)
            }
            else {
                throw new Error("Doctor not found")
            }
        })
        .catch(error => next(error))
}

// @desc     Delete doctor
// @route    DELETE /doctor/:id
// @access   ----
exports.deleteDoctor = async  (request, response, next) => {
    const doctorObject = await doctorSchema.findById(request.params.id);
    if (!doctorObject) {
        return next(
          new ErrorResponse(`doctor not found with id of ${request.params.id}`, 404)
        );
      }
      doctorObject.remove();
      response.status(200).json({ success: true, messege: "Delete done successfully" })
}