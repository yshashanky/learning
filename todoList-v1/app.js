const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("./public"));

let items = ["Eat", "Sleep", "Repeat"];

app.get("/", function(req, res){

    let todayDay = new Date();
    let options = {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
    }
    let day = todayDay.toLocaleDateString('en-US', options);

    res.render('list', {todaysDay: day, newListItems: items});
});

app.post("/", function(req, res){
    let item = req.body.item;
    items.push(item);
    res.redirect("/");
});

app.listen(3000, function(req, res){
    console.log("Server started on 3000");
});