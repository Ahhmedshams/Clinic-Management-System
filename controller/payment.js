// app.request(express.json())
const { request, response, json } = require("express");

const mongoose = require("mongoose");
const ErrorResponse = require('./../utils/errorResponse')
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)

require("../model/invoice");
require("../model/patient");
require("../model/doctor");
const invoiceSchema = mongoose.model("invoice");
const patientSchema = mongoose.model("patient");
const doctorSchema = mongoose.model("doctors");

exports.payment = async function (request, response, next) {

  const token = await stripe.tokens.create({
    card: {
      number: '4242424242424242',
      exp_month: 2,
      exp_year: 2024,
      cvc: '314',
    },
  });

  try {

    const patient = await patientSchema.findOne({ _id: request.id });

    if (!patient)
      return next(new ErrorResponse("Patient Doesn't Exist", 404));

    const doctor = await doctorSchema.findOne({ _id: request.params.doctorId });

    if (!doctor)
      return next(new ErrorResponse("Doctor Doesn't Exist", 404))

    stripe.customers.create({

      email: patient.email,
      source: token.id,
      name: patient.name,
    })
      .then((customer) => {

        return stripe.charges.create({
          amount: doctor.price * 100,     // Charging Rs 25
          description: doctor.speciality,
          currency: 'EGP',
          customer: customer.id
        });
      })

      .then(result => {
        let newInvoice = new invoiceSchema({
          paymentType: "Credit Card",
          totalCost: doctor.price * 100,
          date: Date.now(),
          doctor: doctor._id,
          patient: patient._id,
          status: "Success"
          // small 
        })

        newInvoice.save()
          .then(result => {
            response.status(201).json({
              success: true
            });
          }).catch(error => next(new ErrorResponse(error.message)))

        response.status(201).json({ success: "true" })
      })
      .catch(err => {
        let newInvoice = new invoiceSchema({
          paymentType: "Credit Card",
          totalCost: doctor.price * 100,
          date: Date.now(),
          doctor: doctor._id,
          patient: patient._id,
          status: "Failed"
          // small 
        })
        newInvoice.save()
        next(new ErrorResponse(err.message))
      });

  } catch (e) {
    return next(new ErrorResponse(e.message))
  }
}

  exports.paymentWithCash = async (request, response, next) => {

    try {

      const patient = await patientSchema.findOne({ _id: request.body.patientId });

      if (!patient)
        return next(new ErrorResponse("Patient Doesn't Exist", 404));

      const doctor = await doctorSchema.findOne({ _id: request.body.doctorId });

      if (!doctor)
        return next(new ErrorResponse("Doctor Doesn't Exist", 404))


      let newInvoice = new invoiceSchema({

        paymentType: "Cash",
        totalCost: doctor.price * 100,
        date: Date.now(),
        doctor: doctor._id,
        patient: patient._id,
        status: "Success"
      })
      newInvoice.save()
        .then(invoice => {
          response.status(201).json(
            {
              success: "true"
            });
        })
        .catch(error => next(error.message))
    }catch(e){
      return next(new ErrorResponse(e.message))
    }
  }