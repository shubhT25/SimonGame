gamePattern = [];
userClickedPattern = [];
var level = 0;
buttonColours = ["red", "blue", "green", "yellow"];

$(document).keypress(function(){
    if(level===0){
        nextSequence();
        var started = true;
    }else {
        startOver();
    }
});

function nextSequence(){
    userClickedPattern = [];
    level++;
    var randonNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randonNumber];
    gamePattern.push(randomChosenColour);

    $("#level-title").text("Level "+level);
    animate(randomChosenColour);
    playsound(randomChosenColour);
}

$("[type=button]").click(function() 
{
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    animate(userChosenColour);
    playsound(userChosenColour);
    checkAnswer(userClickedPattern.length-1);

});

function checkAnswer(currentlevel)
{
    console.log(currentlevel);
    console.log(userClickedPattern);
    console.log(gamePattern);

    if(gamePattern[currentlevel] === userClickedPattern[currentlevel]) {
        console.log("Correct");
        if(gamePattern.length === userClickedPattern.length)
        {
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else{
        console.log("Wrong");
        $('body').addClass("game-over");
        setTimeout(function(){
            $('body').removeClass("game-over");
        },200);

        playsound("wrong");
        $("#level-title").html("Game-Over <br><br>Press A Key to Restart");
        startOver();
    }
}

function playsound(sound)
{
    var audio = new Audio("sounds/"+ sound +".mp3");
    audio.play();
}

function animate(color)
{
    $("#"+color).addClass("pressed");
    $("#"+color).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    setTimeout(function() {
        $("#"+color).removeClass("pressed");
      }, 100);
}

function startOver(){
    level=0;
    gamePattern = [];
    started = false;
}