
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;
function nextSequence(){
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    userClickedPattern = [];
    gamePattern.push(randomChosenColour);
    console.log(gamePattern);
    $('#level-title').text('Level '+level++);

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    // playSound(randomChosenColour);
}

  $(".btn").click(function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    console.log("User clicked pattern "+userClickedPattern);
    
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
    
  })

function playSound(randomChosenColour){
  var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
  console.log(currentColour);
  $("#" + currentColour).addClass("pressed").delay(100)
    .queue(function (next) {
      $(this).removeClass('pressed');
      next();
    })
}

$(document).on('keydown', function (event) {
  if (!started) {
    $('#level-title').text('Level 0');
    nextSequence();
    started = true;
  }
})

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length){
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over").delay(200)
    .queue(function (next) {
      $(this).removeClass('game-over');
      next();
    })
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}
