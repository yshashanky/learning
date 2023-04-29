const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("./public"));

const items = ["Eat", "Sleep", "Repeat"];
const workItems = [];

app.get("/", function (req, res) {
    res.render('list', { listTitle: date.getDay(), newListItems: items });
});

app.get("/work", function (req, res) {
    res.render("list", { listTitle: "Work List", newListItems: workItems })
});

app.post("/", function (req, res) {
    const item = req.body.item;
    if (req.body.list === "Work List") {
        workItems.push(item);
        res.redirect("/work");
    } else {
        items.push(item);
        res.redirect("/");
    }
});

app.listen(3000, function (req, res) {
    console.log("Server started on port 3000");
});