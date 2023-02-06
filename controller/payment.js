
// app.request(express.json())
const { request, response, json } = require("express");

const mongoose = require("mongoose");

const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)

require("../Models/invoiceModel");
const InvoiceSchema = mongoose.model("invoices");


exports.payment = async function (req, res, next) {

    const invoice = InvoiceSchema.findOne({ _id: req.params.invoiceId }, {});
    const invoceDetails = await invoice.exec();
    const money = await invoceDetails.money;
    const paymentMethod = await invoceDetails.paymentMethod;
    const medicine = await invoceDetails.medicine;
    //description

    if (paymentMethod === "Credit Card") {
        try {
          const session = await stripe.checkout.sessions.create({
            client_reference_id: `${req.params.invoiceId}`,
            payment_method_types: ["card"],
            line_items: [
              {
                price_data: {
                  currency: "EGP",
                  unit_amount: money * 100,
    
                  product_data: {
                    name: `Invoce No: ${req.params.invoiceId}`,
                    description: `${paymentDescription}`, //description
                  },
                },
                quantity: 1,
              },
            ],
            // success_url: `${req.protocol}://${req.get("host")}/invoice/?id=${req.params.invoiceId}`,
            // cancel_url: `${req.protocol}://${req.get("host")}/invoice/`,
          });
    
          // 3) Create session as response
          res.status(200).json({
            status: "success",
            session,
          });
        } catch (error) {
          next(error);
        }
      } else {
        res.status(400).json({ status: "Fail", message: "That's not Credit Card Payment" });
      }
    };

//     const token = await stripe.tokens.create({
//         card: {
//             number: '4242424242424242',
//             exp_month: 2,
//             exp_year: 2024,
//             cvc: '314',
//         },
//     });

//     // Moreover you can take more details from user
//     // like Address, Name, etc from form
//     stripe.customers.create({
//         email: "ahmedelagezy0@gmail.com",
//         source: token.id,
//         name: 'Gourav Hammad',
//         address: {
//             line1: 'TC 9/4 Old MES colony',
//             postal_code: '452331',
//             city: 'Indore',
//             state: 'Madhya Pradesh',
//             country: 'India',
//         }
//     })
//         .then((customer) => {

//             return stripe.charges.create({
//                 amount: 2500,     // Charging Rs 25
//                 description: 'dentistry',
//                 currency: 'USD',
//                 customer: customer.id
//             });
//         })
//         .then(result => {
//             response.status(201).json({ success: "true" })
//         }).catch(err => next(err))
// }
