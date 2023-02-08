// app.request(express.json())
const { request, response, json } = require("express");

const mongoose = require("mongoose");
const ErrorResponse = require('./../utils/errorResponse')
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)

require("../model/invoice");
require("../model/patient")
require("../model/doctor")
const InvoiceSchema = mongoose.model("invoice");
const patientSchema = mongoose.model("patient");
const doctorSchema = mongoose.model("doctors");

exports.payment = async function (request, response, next) {

  // const invoice = InvoiceSchema.findOne({ _id: req.params.invoiceId }, {});
  // const invoceDetails = await invoice.exec();
  // const money = await invoceDetails.money;
  // const paymentMethod = await invoceDetails.paymentMethod;
  // const medicine = await invoceDetails.medicine;
  //description

  // if (paymentMethod === "Credit Card") {
  //     try {
  //       const session = await stripe.checkout.sessions.create({
  //         client_reference_id: `${req.params.invoiceId}`,
  //         payment_method_types: ["card"],
  //         line_items: [
  //           {
  //             price_data: {
  //               currency: "EGP",
  //               unit_amount: money * 100,

  //               product_data: {
  //                 name: `Invoce No: ${req.params.invoiceId}`,
  //                 description: `${paymentDescription}`, //description
  //               },
  //             },
  //             quantity: 1,
  //           },
  //         ],
  //         // success_url: `${req.protocol}://${req.get("host")}/invoice/?id=${req.params.invoiceId}`,
  //         // cancel_url: `${req.protocol}://${req.get("host")}/invoice/`,
  //       });

  //       // 3) Create session as response
  //       res.status(200).json({
  //         status: "success",
  //         session,
  //       });
  //     } catch (error) {
  //       next(error);
  //     }
  //   } else {
  //     res.status(400).json({ status: "Fail", message: "That's not Credit Card Payment" });
  //   }
  // };



  const token = await stripe.tokens.create({
    card: {
      number: '4242424242424242',
      exp_month: 2,
      exp_year: 2024,
      cvc: '314',
    },
  });

  // Moreover you can take more details from user
  // like Address, Name, etc from form
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
      // address: patient.address
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
        let newInvoice = new InvoiceSchema({
          paymentType: "Credit Card",
          totalCost: doctor.price * 100,
          date: Date.now(),
          doctorId: doctor._id,
          patientId: patient._id,
          status: "Success"
          // small 
        })
        newInvoice.save()
          .then(result => {
            response.status(201).json({
              success: true
            });
          })
          .catch(error => next(new ErrorResponse(error.message)))
        response.status(201).json({ success: "true" })
      })
      .catch(err => {
        let newInvoice = new InvoiceSchema({
          paymentType: "Credit Card",
          totalCost: doctor.price * 100,
          date: Date.now(),
          doctorId: doctor._id,
          patientId: patient._id,
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

      const patient = await patientSchema.findOne({ _id: request.id });

      if (!patient)
        return next(new ErrorResponse("Patient Doesn't Exist", 404));

      const doctor = await doctorSchema.findOne({ _id: request.params.doctorId });

      if (!doctor)
        return next(new ErrorResponse("Doctor Doesn't Exist", 404))


      let newInvoice = new InvoiceSchema({

        paymentType: "Cash",
        totalCost: doctor.price * 100,
        date: Date.now(),
        doctorId: doctor._id,
        patientId: patient._id,
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