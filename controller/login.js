let jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
require("./../model/employee");
require("./../model/user");
const userSchema = mongoose.model("users");



exports.login = (req, res, next) => {
  if (req.body.email == "Al-Agezy@gmail.com" && req.body.password == "ahmed123") {
    let token = jwt.sign({
      role: "admin"
    }, process.env.SECRET_KEY);
    res.status(200).json({ data: "Authorized Admin", token });

  } else {

    userSchema.findOne({
      email: req.body.email,
      password: req.body.password,
    }).then((user) => {
      if (user != null) {
        let userId;
        if (user.role == "patient") {
          userId = user.patientRef_id
        }
        else if (user.role == "employee") {
          userId = user.employeeRef_id
        } else userId = user.doctorsRef_id ;

        let token = jwt.sign(
          {
            id: userId,
            role: user.role
          },
          process.env.SECRET_KEY, {
          expiresIn: "30d",
        });
        res.status(200).json({ data: `Authorized ${user.role}`, token });

      } else {
        let error = new Error("Not Authinticated")
        error.status = 401;
        next(error);
      }
    });
  }
};
