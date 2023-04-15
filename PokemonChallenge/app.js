const express = require("express");
const https = require("node:https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
    
    let pokemonName = req.body.fname;
    const url = "https://pokeapi.co/api/v2/pokemon/" + pokemonName;

    https.get(url, function (response) {

        let pokemon = [];
        response.on('data', function (data) {
            pokemon.push(data);

        }).on('end', function () {
            let data = Buffer.concat(pokemon);
            const pokemonData = JSON.parse(data);
            console.log(pokemonData);
            const name = pokemonData.name
            const height = pokemonData.height
            const weight = pokemonData.weight
            const type = pokemonData.types.map((type) => type.type.name).join(', ')
            const img = pokemonData.sprites['front_default']
            const imgTag = "<img src=\"" + img + "\" alt=\"Girl in a jacket\" width=\"500\" height=\"600\">"
            res.send("Pokemon " + name + " is " + type + " pokemon of height and weight " + height + " and " + weight + " respectively!!" + imgTag);

        });
    });

});


app.listen(3000, function () {
    console.log("server is running on 3000...")
});