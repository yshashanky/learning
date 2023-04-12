var numberOfDrumButton = document.querySelectorAll(".drum").length;

for (var i = 0; i < numberOfDrumButton; i++){

    document.querySelectorAll(".drum")[i].addEventListener("click", function () {
        
        // const imgArray = (window.getComputedStyle(this).backgroundImage).split("/");
        // const img = ((imgArray[imgArray.length - 1]).split("."))[0];
        // var audio = new Audio("./sounds/" + img + ".mp3");
        // audio.play();
        animation(this.innerHTML);
        sound(this.innerHTML);

    });
} 

document.addEventListener("keydown", function(keyPressed){
    sound((keyPressed.key).toLowerCase());
});

function sound(key) {
    
    switch(key) {

        case "w":
            var audio = new Audio("./sounds/tom3.mp3");
            audio.play();
            animation(key);
            break;

        case "a":
            var audio = new Audio("./sounds/tom1.mp3");
            audio.play();
            animation(key);
            break;

        case "s":
            var audio = new Audio("./sounds/crash.mp3");
            audio.play();
            animation(key);
            break;

        case "d":
            var audio = new Audio("./sounds/kick.mp3");
            audio.play();
            animation(key);
            break;

        case "j":
            var audio = new Audio("./sounds/snare.mp3");
            audio.play();
            animation(key);
            break;

        case "k":
            var audio = new Audio("./sounds/tom2.mp3");
            audio.play();
            animation(key);
            break;

        case "l":
            var audio = new Audio("./sounds/tom4.mp3");
            audio.play();
            animation(key);
            break;

        default:
           console.log("wrong key!!"); 

    };
}

function animation(key) {

    var activeButton = document.querySelector("." + key);
    activeButton.classList.add("pressed");

    setTimeout(function() {
        activeButton.classList.remove("pressed");
    }, 100);
}