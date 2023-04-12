// $(document).ready(function (){
//     $("h1").css("color", "red");
// });

// $("h1").removeClass("big-title");

$("h1").addClass("big-title margin");

$("h1").text("Bye");

$("button").text("Hellow");

$("h1").click(function() {
    $("h1").css("color", "purple");
});

$("button").click(function() {
    $("h1").css("color", "purple");
}); 

$(document).keypress(function(event) {
    $("h1").text(event.key);
});

$("h1").on("mouseover", function() {
    $("h1").css("color", "purple");
});

$("h1").before("<button>before</button>");
$("h1").after("<button>after</button>");
$("h1").prepend("<button>prepend</button>");
$("h1").append("<button>append</button>");

