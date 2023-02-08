const jwt = require("jsonwebtoken");

exports.login = (request, response, next) => {
  try {
    let token = req.get("authorization").split(" ")[1];
    let decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    // console.log(decodedToken);
    // req.id = decodedToken.id;
    request.id=decodedToken.id;
    request.role = decodedToken.role;
  } catch (error) {
    error.status = 403;
    error.message = "Not Authorized";
    next(error);
  }
  next();
};

