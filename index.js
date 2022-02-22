var game_is_start = false;
var steps = [];
var pointer = 0;
var level = 0;

$(".btn").on("click", function(event){
    animate(event.target.id);
    if(event.target.id=="green")check(0);
    else if(event.target.id=="red")check(1);
    else if(event.target.id=="yellow")check(2);
    else if(event.target.id=="blue")check(3);
});

$(document).on("keypress", function() {
        if(game_is_start == false){
            game_is_start = true;
            $("h1").html("level " + ++level);
            game();
    }    
});

function game(){
    var randomInt = Math.floor(Math.random()*4);
    steps.push(randomInt);
    if(randomInt == 0)animate("green");
    else if(randomInt == 1) animate("red");
    else if(randomInt == 2)animate("yellow");
    else animate("blue");
}

function animate(color){
    $("#"+color).addClass("pressed");
    var audio = new Audio("sounds/"+color+".mp3");
    audio.play();
    setTimeout(()=>{
        $("#"+color).removeClass("pressed")
    }, 150);
}

function check(id){
    if(id != steps[pointer++]) {
        steps = []
        pointer = 0;
        game_is_start = false;
        level = 0;
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        $("h1").html("Game over! Press Any Key to Restart");
        $("body").addClass("game-over");
        setTimeout(()=>{
            $("body").removeClass("game-over");
        }, 300);
    }
    else if(pointer == steps.length) {
        pointer = 0;
        $("h1").html("level " + ++level);
        setTimeout(()=>{
            if(game_is_start == true)game();
        }, 800);
    }
}
