const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const https = require("node:https");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
});

app.listen(3000, function(){
    console.log("server is running on port 3000...");
});