var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var score = 0;
var started = false;
var level = 0;
var highScore = 0;

$(document).on("keypress", function() {
	if (!started) {
		nextSequence();
		$(".score").text("Current Score: " + score);
		$(".text").text("LEVEL: " + level);
		started = true;
	}
})

function nextSequence() {
	var randomNumber = Math.floor(Math.random() * 4);
	var randomChosenColour = buttonColours[randomNumber];
	gamePattern.push(randomChosenColour);
	userClickedPattern = [];
	var intervalId = setInterval(function() {
		if (i === gamePattern.length) {
			clearInterval(intervalId);
		}
		$("." + gamePattern[i]).attr("id", gamePattern[i]);
		setInterval(function() {
			$("." + gamePattern[i]).removeAttr("id", gamePattern[i]);
		}, 800);
		var audio = new Audio("sounds/" + gamePattern[i] + ".mp3");
		audio.play();
		i++;
	}, 1000);
	i = 0;
	level++
	score = level - 1;
	$(".score").text("Current Score: " + score);
	$(".text").text("LEVEL: " + level);
};

$("button").on("click", function() {
	var userChosenColour = ($(this).attr("class")).split(" ").pop();
	userClickedPattern.push(userChosenColour);
	$("." + userChosenColour).attr("id", userChosenColour);
	setInterval(function() {
		$("." + userChosenColour).removeAttr("id", userChosenColour);
	}, 800);
	var audioOnClick = new Audio("sounds/" + userChosenColour + ".mp3");
	audioOnClick.play();
	checkAnswer(userClickedPattern.length - 1)
});


function checkAnswer(currentLevel) {
	if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
		console.log("succes");
		if (userClickedPattern.length === gamePattern.length) {
			setTimeout(function() {
				nextSequence();
			}, 1000);
		}
	}
	else {
		if (score > highScore) {
			highScore = score;
			$(".high-score").text("High Score: " + highScore);
		}
		gamePattern = [];
		userClickedPattern = [];
		score = 0;
		level = 0;
		started = false;
		$(".text").text("Press any key to start!");

	}
}

