const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("./public"));

mongoose.connect("mongodb://127.0.0.1:27017/wikiDB", { useNewUrlParser: true });

const articleSchema = {
    title: String,
    content: String
};

const Article = mongoose.model("Article", articleSchema);

app.route("/articles")
    .get(function(req, res){
        Article.find().then((articles) => {
            res.send(articles);
        });
    })
    .post(function(req, res){
    
        const newArticle = new Article({
            title: req.body.title,
            content: req.body.content
        });
    
        newArticle.save().then((data) => {
            res.send("Success");
        });
    })
    .delete(function(req, res){
        Article.deleteMany().then((data) => {
            res.send("Success")
        });
    });

app.route("/articles/:articleTitle")
    .get(function(req, res){
        Article.findOne({title: req.params.articleTitle}).then((articles) => {
            res.send(articles);
        });
    })
    .put(function(req, res){
        Article.findOneAndUpdate(
            {title: req.params.articleTitle},
            {title: req.body.title, content: req.body.content},
            {upsert: true}
            ).then((articles) => {
                res.send(articles);
            });
    });


app.listen(3000, function (req, res) {
    console.log("Server started on port 3000");
});


// app.get("/articles", function(req, res){
//     Article.find().then((articles) => {
//         res.send(articles);
//     });
// });

// app.post("/articles", function(req, res){
    
//     const newArticle = new Article({
//         title: req.body.title,
//         content: req.body.content
//     });

//     newArticle.save().then((data) => {
//         res.send("Success");
//     });
// });

// app.delete("/articles", function(req, res){
//     Article.deleteMany().then((data) => {
//         res.send("Success")
//     });
// });