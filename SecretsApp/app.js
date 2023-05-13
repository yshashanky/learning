require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const findOrCreate = require("mongoose-findorcreate");

const app = express();
app.use(express.static("./public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: process.env.PASSPORT_SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb://127.0.0.1:27017/usersDB", { useNewUrlParser: true });

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    googleId: String,
    secret: String
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

const User = new mongoose.model("User", userSchema);

passport.use(User.createStrategy());

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(user, cb) {
    process.nextTick(function() {
      return cb(null, user);
    });
  });

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/secrets",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
},
    function (accessToken, refreshToken, profile, cb) {
        console.log(profile);
        User.findOrCreate({ googleId: profile.id }, function (err, user) {
            return cb(err, user);
        });
    }
));

app.get("/", function (req, res) {
    if (req.isAuthenticated()) {
        res.redirect("/secrets");
    } else {
        res.render("home");
    };
});

app.get("/auth/google",
    passport.authenticate("google", { scope: ["profile"] }));

app.get("/login", function (req, res) {
    if (req.isAuthenticated()) {
        res.redirect("/secrets");
    } else {
        res.render("login");
    };
});

app.get("/register", function (req, res) {
    if (req.isAuthenticated()) {
        res.redirect("/secrets");
    } else {
        res.render("register");
    };
});

app.get("/secrets", function (req, res) {
    User.find({"secret": {$ne: null}}).then((foundSecrets) => {
        res.render("secrets", {usersWithSecrets: foundSecrets});
    });
});

app.get("/submit", function (req, res) {
    if (req.isAuthenticated()) {
        res.render("submit");
    } else {
        res.redirect("/login");
    };
});

app.get("/auth/google/secrets",
    passport.authenticate("google", { failureRedirect: "/login" }),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect("/secrets");
    });


app.get("/logout", function (req, res) {
    req.logout(function (err) { if (err) { console.log(err) } });
    res.redirect("/");
});

app.post("/register", function (req, res) {

    User.register({ username: req.body.username }, req.body.password, function (err, user) {
        if (err) {
            console.log(err);
            res.redirect("/register");
        } else {
            passport.authenticate("local")(req, res, function () {
                res.redirect("/secrets");
            });
        }
    });

});

app.post("/login", function (req, res) {

    const user = new User({
        username: req.body.username,
        password: req.body.password
    });

    passport.authenticate('local', function (err, user, info) {

        if (err) { res.redirect('/login'); }
        if (user) {
            req.logIn(user, function (err) {
                if (err) { res.redirect('/login'); }
                else res.redirect('/secrets');
            });
        }
        else {
            //Incorrect credentials, hence redirect to login 
            return res.redirect('/login');
        }

    })(req, res);
});

app.post("/submit", function(req, res){
    const submitSecret = req.body.secret;
    User.findById(req.user).then((data) => {
        if(data){
            data.secret = submitSecret;
            data.save().then(() => {
                res.redirect("/secrets")
            });
        }
    });
});

app.listen(3000, function (req, res) {
    console.log("Server started on port 3000");
});