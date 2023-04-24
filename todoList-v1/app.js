const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

var items = ["Eat", "Sleep", "Repeat"];

app.get("/", function(req, res){

    var todayDay = new Date();
    var options = {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
    }
    var day = todayDay.toLocaleDateString('en-US', options);

    res.render('list', {todaysDay: day, newListItems: items});
});

app.post("/", function(req, res){
    var item = req.body.item;
    items.push(item);
    res.redirect("/");
});

app.listen(3000, function(req, res){
    console.log("Server started on 3000");
});