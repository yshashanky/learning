const express = require("express");
var app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

// app.get("/", function(req, res){
//     res.send("<h1>Hello.</h1>");
// });
// app.get("/contact", function(req, res){
//     res.send("<h1>Contact me: shashankyadav.1299@gmail.com</h1>");
// });
// app.get("/about", function(req, res){
//     res.send("<h1>I am done for the day..</h1>");
// });


app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
    var num = Number(req.body.num1);
    var num2 = Number(req.body.num2);
    var result = num*num2;
    res.send("The answer is " + result); 
});

app.listen(3000, function(){
    console.log("Server started on port 3000");
});
