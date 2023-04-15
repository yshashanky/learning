const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const https = require("node:https");
const exp = require("node:constants");
const { url } = require("node:inspector");

const app = express();
app.use(express.static("Public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
    const fname = req.body.fname;
    const lname = req.body.lname;
    const email = req.body.email;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: fname,
                    LNAME: lname
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);

    const url = "https://us21.api.mailchimp.com/3.0/lists/6d77504529"
    const options = {
        method: "POST",
        auth: "yshashanky:fb5518e182a9ce09a4868d0ca28492f0-us21"
    }

    const request = https.request(url, options, function(response){
        response.on("data", function(data){
            console.log(JSON.parse(data));
        });
    });
    
    request.write(jsonData);
    request.end();
});

app.listen(3000, function () {
    console.log("server is running on port 3000...");
});


// API
// fb5518e182a9ce09a4868d0ca28492f0-us21

// List ID
// 6d77504529