const express = require("express");
const router = express.Router();
const controller = require("./../controller/invoice");
const validator = require("./../middlewares/errorValidation");
const expressValidation = require("./../middlewares/validations")
const mongoose = require('mongoose');

const advancedResults = require("./../middlewares/advancedResult");
const allowedUsers = require("./../middlewares/AuthorizeRole");

const invoice = mongoose.model('invoice');


router.route("/invoice")
    .get(allowedUsers.checkWithRole("admin"), advancedResults(invoice), controller.getAllinvoice)
    .post(allowedUsers.checkWithRole("admin", "employee"), expressValidation.invoicePost, validator, controller.addInvoice)
    .patch(allowedUsers.checkWithRole("admin", "employee"), expressValidation.invoiceUpdate, validator, controller.updateInvoice)


router.get("/invoice/:id",
    allowedUsers.checkWithRole("admin"),
    validator,
    controller.getInvoiceByID)

router.delete("/invoice/:id",
    allowedUsers.checkWithRole("admin"),
    validator, controller.deleteInvoiceByID)


module.exports = router;
