const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("./public"));

const workItems = [];

mongoose.connect("mongodb://127.0.0.1:27017/todolistDB", { useNewUrlParser: true });

const itemsSchema = {
    name: String,
};

const Item = mongoose.model("Item", itemsSchema);

const defaultItem1 = new Item({
    name: "Wake up..."
});

const defaultItem2 = new Item({
    name: "Get back to your senses"
});

const defaultItem3 = new Item({
    name: "Don't burst on anyone"
});

const defaultItem = [defaultItem1, defaultItem2, defaultItem3];

app.get("/", function (req, res) {

    Item.find().then((foundItems) => {

        if (foundItems.length == 0) {
            Item.insertMany(defaultItem);
            res.redirect("/");
        } else {
            res.render('list', { listTitle: "Today", newListItems: foundItems });
        }; 
    });
});

app.get("/work", function (req, res) {
    res.render("list", { listTitle: "Work List", newListItems: workItems })
});

app.post("/", function (req, res) {
    const itemName = req.body.item;

    const item = new Item({
        name: itemName
    });

    Item.create(item);
    res.redirect("/");

    // if (req.body.list === "Work List") {
    //     workItems.push(item);
    //     res.redirect("/work");
    // } else {
    //     items.push(item);
    //     res.redirect("/");
    // }
});


app.post("/delete", function (req, res) {
    const deletedItem = req.body.delItem;

    Item.findOneAndDelete({ _id: deletedItem }).exec();
    res.redirect("/");
});

app.listen(3000, function (req, res) {
    console.log("Server started on port 3000");
});