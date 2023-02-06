const { request, response } = require("express")

module.exports = fn => {
    return (request, response, next) => {
        fn(request, response, next).catch(next);
    };
};