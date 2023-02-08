let jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const ErrorResponse = require('./../utils/errorResponse');
require("./../model/employee");
const EmployeeSchema = mongoose.model("employee");



exports.login = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorResponse('Please Provide an email and password', 400));
  }

  if (email == "Al-Agezy@gmail.com" && password == "ahmed123") {
    let token = jwt.sign({
      role: "admin"
    }, process.env.SECRET_KEY);
    res.status(200).json({ data: "Authorized Admin", token });

  } else {

    EmployeeSchema.findOne({
      email: req.body.email,
      password: req.body.password,
    }).then((employee) => {
      if (employee != null) {
        let token = jwt.sign(
          {
            id: employee._id,
            role: "employee"
          },
          process.env.SECRET_KEY, {
          expiresIn: "30d",
        });
        res.status(200).json({ data: "Authorized Employee", token });
      } else {
        let error = new Error("Not Authinticated")
        error.status = 401;
        next(error);
      }
    });
  }
};
