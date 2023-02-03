const ErrorResponse = require("../utils/errorResponse");

const errorHandler =(error,request, response,next)=>{
    
    response.status(error.statusCode||500).json({
        success:false,
        Error:error.message || 'Server Error'
    });
}

module.exports = errorHandler  