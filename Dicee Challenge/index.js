const img1 = document.getElementById("img1");
// img1.setAttribute("src", "./images/dice1.png");

const img2 = document.getElementById("img2");
// img2.setAttribute("src", "./images/dice1.png");

const header = document.getElementById("header");

// if (performance.navigation.type == performance.navigation.TYPE_RELOAD) {

//     let randomImg1 = Math.floor((Math.random() * 6) + 1);
//     let randomImg2 = Math.floor((Math.random() * 6) + 1);

//     var srcImg1 = "./images/dice" + randomImg1 +".png";
//     var srcImg2 = "./images/dice" + randomImg2 +".png";

//     img1.setAttribute("src", srcImg1);
//     img2.setAttribute("src", srcImg2);

//     if (randomImg1 > randomImg2){
//         header.innerHTML = " 🚩 Player 1 wins! ";
//     } else if (randomImg2 > randomImg1){
//         header.innerHTML = " Player 2 wins! 🚩 ";
//     }

// }

let randomImg1 = Math.floor((Math.random() * 6) + 1);
let randomImg2 = Math.floor((Math.random() * 6) + 1);

var srcImg1 = "./images/dice" + randomImg1 +".png";
var srcImg2 = "./images/dice" + randomImg2 +".png";

img1.setAttribute("src", srcImg1);
img2.setAttribute("src", srcImg2);

if (randomImg1 > randomImg2){
    header.innerHTML = " 🚩 Player 1 wins! ";
} else if (randomImg2 > randomImg1){
    header.innerHTML = " Player 2 wins! 🚩 ";
}