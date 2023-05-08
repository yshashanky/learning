const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("./public"));

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

const ListSchema = {
    name: String,
    items: [itemsSchema]
};

const List = mongoose.model("List", ListSchema);

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

app.get("/:customListName", function (req, res) {
    const customName = req.params.customListName;
    const customListName = customName.toLowerCase();

    const list = new List({
        name: customListName,
        items: defaultItem
    })

    List.find({name: customListName}).then((foundList) => {
        if (foundList.length == 0){
            List.create(list);
            res.redirect("/".concat(customListName));
        } else {
            res.render('list', { listTitle: foundList[0].name, newListItems: foundList[0].items });
        };
    });

});

app.post("/", function (req, res) {
    const itemName = req.body.item;
    const listName = req.body.list;
    console.log(listName);

    const item = new Item({
        name: itemName
    });

    if (listName === "Today"){
        item.save();
        res.redirect("/");
    } else {
        List.findOne({name: listName}).then((foundList) => {
            foundList.items.push(item);
            foundList.save();
            res.redirect("/".concat(listName));
        })
    };
});


app.post("/delete", function (req, res) {
    const deletedItem = req.body.delItem;
    const listName = req.body.listName;

    if (listName === "Today"){
        Item.findOneAndDelete({ _id: deletedItem }).exec();
        res.redirect("/");
    } else {
        List.findOneAndUpdate({name: listName}, {$pull: {items: {_id: deletedItem}}})
        .then((foundList) => {
            console.log(foundList)
            res.redirect("/".concat(listName));
        });
    };

});

app.listen(3000, function (req, res) {
    console.log("Server started on port 3000");
});