const { request, response } = require("express");
const { default: mongoose } = require("mongoose");
require("./../Model/clinic");

const ClinicSchema = mongoose.model("clinic");

exports.getAllclinics = (request, response, next) => {
    ClinicSchema.find()
        .then((data) => {
            response.status(200).json(data);
        })
        .catch((error) => next(error))
}
exports.addClinic = (request, response, next) => {
    let newClinic = new ClinicSchema({
        _id: request.body.id,
        name: request.body.name,
        email: request.body.email,
        location: request.body.location,
        speciality: request.body.speciality,
        medicines: request.body.medicines,
        doctors: request.body.doctors,
        employees: request.body.employees,
    })
    newClinic.save()
        .then(result => {
            response.status(201).json(result);
        })
        .catch(error => next(error))
}

exports.updateClinic = (request, response, next) => {
    ClinicSchema.updateOne({
        _id: request.body.id,
    }, {
        $set: {
            name: request.body.name,
            email: request.body.email,
            location: request.body.location,
            speciality: request.body.speciality,
            medicines: request.body.medicines,
            doctors: request.body.doctors,
            employees: request.body.employees,
        }
    })
        .then(result => {
            if (result.matchedCount == 0) {
                throw new Error("This Clinic is not found");
            } else {
                response.status(200).json({ "message": "Clinic is updated" })
            }
        })
        .catch(error => next(error))
}
exports.getClinicByID = (request, response, next) => {
    ClinicSchema.findById(request.params.id)
        .then((data) => {
            response.status(200).json(data)
        })
        .catch(error => next(error))
}
exports.deleteClinicByID = (request, response, next) => {
    ClinicSchema.findByIdAndDelete(request.params.id)
        .then((result) => {
            if (result != null) {
                response.status(200).json({ "message": "This Clinic is deleted" })
            } else {
                throw new Error("This Clinic is not exist")
            }
        })
        .catch(error => next(error))
}