function player(name, games, average) {
	this.name = name;
	this.games = games;
	this.average = average;
};

function getRandomInt(min,max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
};

function newAverage(oldAverage, currentTurn, numGames) {
	return oldAverage + ((currentTurn - oldAverage)/numGames);
};

var turn = 0;
var myInt = getRandomInt(1,100);
var playerOne = new player($.cookie("pn"), Number($.cookie("ng")), Number($.cookie("avg")));

$(document).ready(function() {
	$("#newPlayer, #newPlayerSubmit").hide();
	$("#restart").hide();
	var playerName = $.cookie("pn");
	if (playerName == undefined) {
		$("#newPlayer, #newPlayerSubmit").show();
		$("#guess, #pGuess, #turns, #submitGuess").hide();
	}
	else {
		var greeting = 'Welcome back, '+playerOne.name+'. You\'ve played '+playerOne.games+' times. The average number of turns you take to win is '+playerOne.average+'.';
		$('#msg').append((document.createTextNode(greeting)));
	};
});

function clearCookies() {
	$.removeCookie("pn");
	$.removeCookie("ng");
	$.removeCookie("avg");
	$("#guess, #pGuess, #turns, #submitGuess").hide();
	$("#msg").hide();
	$("#newPlayer, #newPlayerSubmit").show("slow");
};

function setName() {
	var nameEntered = document.getElementById('pName').value;
	$.cookie("pn", nameEntered);
	$.cookie("ng", 0);
	$.cookie("avg", 0);
	$("#newPlayer, #newPlayerSubmit").hide("slow");
	$("#guess, #pGuess, #turns, #submitGuess").show();
	playerOne = new player(nameEntered, 0, 0);
	return playerOne;
};

function submitGuess() {
	var currentGuess = document.getElementById('pGuess').value;
	$("#pGuess").val("");
	if (isNaN(currentGuess) !== true && currentGuess !== "" && currentGuess !== " ") {
		turn ++;
		$("#turns").html(turn);
		if (currentGuess == myInt) {
			playerOne.games += 1;
			$.cookie("ng", playerOne.games);
			var av = newAverage(playerOne.average, turn, playerOne.games);
			playerOne.average = av;
			$.cookie("avg", av);
			$("#guess, #pGuess, #turns, #submitGuess").hide();
			$("#highlow").replaceWith("<p id=\"highlow\" style=\"font-size: 40px\">Correct!!</p>");
			$("#restart").show("slow");
		}
		else if (currentGuess < myInt) {
			$("#highlow").replaceWith("<p id=\"highlow\" style=\"color:green\">Try a higher number</p>");
		}
		else {
			$("#highlow").replaceWith("<p id=\"highlow\" style=\"color:red\">Try a lower number</p>");
		};
	}
	else {
		$("#highlow").replaceWith("<p id=\"highlow\" style=\"color:blue\">That isn't a number! We only accept numbers!</p>");
	};
};

function restart() {
	turn = 0;
	$('#turns').html(turn);
	myInt = getRandomInt(1,100);
	greeting = 'Welcome back, '+playerOne.name+'. You\'ve played '+playerOne.games+' times. The average number of turns you take to win is '+playerOne.average+'.';
	$('#msg').show();
	$('#msg').html(greeting);
	$('#guess, #pGuess, #turns, #submitGuess').show();
	$('#highlow').replaceWith("<p id=\"highlow\"></p>");
	$('#restart').hide('slow');
};
