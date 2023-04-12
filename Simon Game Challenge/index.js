const tiles = ["green", "red", "yellow", "blue"]

var i = 0;
var level = 0;
var keyPressed = 0;
var started = false;
var colorArray = [];
var wrongpress = false;

$(document).keypress(function (event) {
    if (event.originalEvent.key == 'a' || event.originalEvent.key == 'A') {
        if (keyPressed == 0) {
            nextLevel();
            keyPressed = 1;
            started = true;
        }
    };

    if (keyPressed == 0 && started == true) {
        nextLevel();
        keyPressed = 1;
    };
});

function nextLevel() {
    level += 1;
    $("#level-title").text("Level " + level);

    const random = Math.floor(Math.random() * tiles.length);
    var selectedTile = "#" + tiles[random];
    colorArray.push(tiles[random]);

    $(selectedTile).fadeOut(100).fadeIn(100);
    playSound(tiles[random]);

    console.log(colorArray);
}

$(".btn").click(function () {
    if (started == true) {
        validate(this.id);
    };
});

function validate(buttonId) {
    if (i < level) {
        if (colorArray[i] == buttonId) {
            playSound(buttonId);
            animatePress(buttonId);
            wrongpress = false;
            i++;
        } else {
            restart();
            wrongpress = true;
            playSound("wrong");
        }
    }
    if (i == level && wrongpress == false) {
        setTimeout(function () {
            nextLevel();
            i = 0;
        }, 1000);
    }
};

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function playSound(buttonId) {
    var audio = new Audio("./sounds/" + buttonId + ".mp3")
    audio.play();
}

function restart() {
    
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");
    setTimeout(function () {
        $("body").removeClass("game-over");
    }, 200);

    level = 0;
    keyPressed = 0;
    colorArray = [];
    i = 0;
}