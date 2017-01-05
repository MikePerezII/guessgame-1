// Version 1 by Eli //

function user(name, wins, losses, guessCount) {
	this.name = name;
	this.wins = wins;
	this.losses = losses;
	this.guessCount = guessCount;
	this.setName = function newUser(name) {
		var input = prompt("Please enter your username:");
		this.name = input;
	};
}

var playerOne = new user ('',0,0);
playerOne.setName();
alert("Hello "+playerOne.name+"! Steel your mind for this, the ultimate game of skill!");

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function playGame(player) {
    player.guessCount = 0;
    var guessAgain = 1;
    var correctNumber = getRandomInt(1,100);
    do {
        var currentGuess = prompt("Guess the integer between 0 and 100!");
        if (isNaN(currentGuess) !== true) {
            if (currentGuess == correctNumber) {
                alert("CORRECT!");
                player.wins ++;
                guessAgain = 0;
            }
            else if (player.guessCount < 7) {
                if (currentGuess > correctNumber) {
                    alert("Hint: Try a lower number!");
                    player.guessCount ++;
                }
                else {
                    alert("Hint: Try a higher number!");
                    player.guessCount ++;
                }
            }
            else {
                alert("You've tried too many times... GAME OVER!");
                player.losses ++;
                guessAgain = 0;
            }
        }
        else {
        alert("You need to guess a number!");
        }
    }
    while (guessAgain == 1);
}

function start(player) {
    var playAgain = 'y';
    do {
        alert("Your record is: "+player.wins+" wins and "+player.losses+" losses.");
        playGame(playerOne);
        playAgain = prompt("Would you like to play again? (y or n)");
    }
    while(playAgain == 'y');
}

start(playerOne);