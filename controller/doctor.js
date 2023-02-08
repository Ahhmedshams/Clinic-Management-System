const express = require("express")
const mongoose = require("mongoose");
const ErrorResponse = require('./../utils/errorResponse')
require("./../model/doctor")
const doctorSchema = mongoose.model("doctors");

exports.newAppointment = (request, response, next) => {
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
// exports.getAllDoctors = (request, response, next) => {
//     doctorSchema.find({})
//         .then((data) => {
//             response.status(200).json({
//                 message: "List of Doctors", data
//             });
//         })
//         .catch(error => { next(error) })
// }

exports.addNewDoctor = (request, response, next) => {
    let newDoctor = new doctorSchema({
        name: request.body.name,
        gender: request.body.gender,
        email: request.body.email,
        password: request.body.password,
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
        .then((result) => {
            response.status(200).json({ message: "Doctor added successfully", result })
        })
        .catch(error => { next(error) })
}

exports.updateDoctor = (request, response, next) => {
    doctorSchema.updateOne(
        { _id: request.params.id },
        {
            $set: {
                name: request.body.name,
                gender: request.body.gender,
                email: request.body.email,
                password: request.body.password,
                phone: request.body.phone,
                address: request.body.address,
                speciality: request.body.speciality,
                yearsOfExperience: request.body.yearsOfExperience,
                calender: request.body.calender,
                clinicId: request.body.clinicId,
                appointmentId: request.body.appointmentId,
                price: request.body.price
            }
        },
    )
        .then(result => {
            if (result.matchedCount == 0) {
                throw new Error("This doctor is not exist");
            }
            else {
                response.status(200).json({ message: "Doctor updated successfully" })
            }
        })
        .catch(error => { next(error) })
}

// exports.deleteDoctor = (request, response, next) => {
//     doctorSchema.findByIdAndDelete({ _id: request.body._id }, {})
//         .then(result => {
//             if (result != null) { response.status(200).json({ message: "Doctor deleted successfully " }) }
//             else { throw new Error("This doctor in not exist") }
//         })
//         .catch(error => { next(error) })
// }

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

exports.deleteDoctorById = (request, response, next) => {
    doctorSchema.deleteOne({ _id: request.params.id })
        .then((result) => {
            if (result != null) {
                response.status(200).json({ "message": "Doctor deleted successfully " })
            } else {
                throw new Error("This doctor in not exist")
            }
        })
        .catch(error => next(error))
}