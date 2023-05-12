require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const md5 = require("md5");

const app = express();
app.use(express.static("./public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb://127.0.0.1:27017/usersDB", { useNewUrlParser: true });

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
});

const User = new mongoose.model("User", userSchema);

app.get("/", function(req, res){
    res.render("home");
});

app.get("/login", function(req, res){
    res.render("login");
});

app.get("/register", function(req, res){
    res.render("register");
});

app.post("/register", function(req, res){
    const newUser = new User({
        email: req.body.username,
        password: md5(req.body.password)
    });

    newUser.save().then((data) => {
        console.log(data);
        res.render("secrets");
    });

});

app.post("/login", function(req, res){
    const username = req.body.username;
    const password = md5(req.body.password);

    User.findOne({email: username}).then((data) => {
        console.log(data);
        if (data === null) {
            res.render("home");
        } else {
            if(data.password === password) {
                res.render("secrets");
            } else {
                res.render("home");
            }
        }
    });
});

app.listen(3000, function (req, res) {
    console.log("Server started on port 3000");
});