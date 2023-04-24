const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("./public"));

let items = ["Eat", "Sleep", "Repeat"];
let workItems = [];

app.get("/", function (req, res) {

    let todayDay = new Date();
    let options = {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
    }
    let day = todayDay.toLocaleDateString('en-US', options);

    res.render('list', { listTitle: day, newListItems: items });
});

app.get("/work", function (req, res) {
    res.render("list", { listTitle: "Work List", newListItems: workItems })
});

app.post("/", function (req, res) {
    let item = req.body.item;
    if (req.body.list === "Work List") {
        workItems.push(item);
        res.redirect("/work");
    } else {
        items.push(item);
        res.redirect("/");
    }
});

app.listen(3000, function (req, res) {
    console.log("Server started on 3000");
});