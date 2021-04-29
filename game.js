var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickPattern = [];
var level = 1;

function nextSequence() {
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColors[randomNumber];
  gamePattern.push(randomChosenColour);
  playSoundRandom(gamePattern);
  animateRandomButton(gamePattern);
  userClickPattern = [];
}

function playSoundRandom(input) {
  for (let i = 0; i < input.length; i++) {
    setTimeout(() => {
      let audio = new Audio(`sounds/${input[i]}.mp3`);
      audio.play();
    }, i * 1000);
  }
}

function animateRandomButton(input) {
  for (let i = 0; i < input.length; i++) {
    setTimeout(() => {
      $("." + input[i]).addClass("flash");
      setTimeout(() => {
        $("." + input[i]).removeClass("flash");
      }, 150);
    }, i * 1000);
  }
}

function playSound(input) {
  let audio = new Audio(`sounds/${input}.mp3`);
  audio.play();
}

function animatePressedButton(input) {
  $("." + input).addClass("pressed");
  setTimeout(() => {
    $("." + input).removeClass("pressed");
  }, 150);
}

function startOver() {
  level = 1;
  gamePattern = [];
  userClickPattern = [];
}

function check(color, index) {
  if (color === gamePattern[index]) {
    if (index + 1 === gamePattern.length) {
      setTimeout(() => {
        nextSequence();
        level++;
        $("h1").text(`Level ${level}`);
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("h1").text("Game Over. Press any key to play again.");
    // $("body").html("<h1>Game Over</h1>");
    $("body").addClass("game-over");
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 2500);
    startOver();
  }
}

$(".btn").click(function () {
  let userChosenColour = $(this).attr("id");
  userClickPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePressedButton(userChosenColour);
  check(userChosenColour, userClickPattern.length - 1);
});

$("body").keydown(() => {
  $("h1").slideUp();
  setTimeout(() => {
    $("h1").text(`Level ${level}`).slideDown();
  }, 700);

  setTimeout(() => {
    nextSequence();
  }, 2000);
});
