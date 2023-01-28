const express = require("express");

//open server with http protocol  http://localhost:8080
const server = express();

let port = process.env.PORT || 8080;

server.listen(port, () => {
    console.log("I'm Listening........", port);
});