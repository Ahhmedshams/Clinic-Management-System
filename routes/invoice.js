const express = require("express");
const router = express.Router();
const controller = require("./../controller/invoice");
const validator = require("./../middlewares/errorValidation");
const expressValidation = require("./../middlewares/validations")
const mongoose = require('mongoose');

const advancedResults = require("./../middlewares/advancedResult");

const invoice = mongoose.model('invoice');


router.route("/invoice")
    .get(advancedResults(invoice), controller.getAllinvoice)
    .post(expressValidation.invoicePost, validator, controller.addInvoice)
    .patch(expressValidation.invoiceUpdate, validator, controller.updateInvoice)


router.get("/invoice/:id",
    validator,
    controller.getInvoiceByID)

router.delete("/invoice/:id",
    validator, controller.deleteInvoiceByID)


module.exports = router;
