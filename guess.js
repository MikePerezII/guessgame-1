/* Main Sequence */

function getRandomInt(min,max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function player() {
    /* create player object */
    this.name = "";
    this.games = []; /* Create array */
    this.avgGuess=0;
    this.playerize = function(storedPlayer) {
        /* convert strings to numbers */
        this.name = storedPlayer.name;
        for(var i = 0; i < storedPlayer.games.length; i++){
            this.games[i] = Number(storedPlayer.games[i]);
        }
        this.avgGuess = Number(storedPlayer.avgGuess);
    }
    this.setName = function(name) {
        myName=name;
        this.name = myName;
    }
    this.addGame = function(turns) {
        this.games.push(turns);
        /* add number of turns to games array */
    }
    this.avgGuessCount = function() {
        /* calculate average based on pushed values */
        var sum = 0;
        for(var i = 0; i < this.games.length; i++){
            sum += this.games[i];
        }
        this.avgGuess = sum/this.games.length;
    }
}

function trim(str) {
  return str.replace(/^\s+|\s+$/g, '');
}

/* timer */
function printTime() {
    var d = new Date();
    var hours = d.getHours();
    var mins = d.getMinutes();
    var secs = d.getSeconds();
    var timenow = hours+":"+mins+":"+secs;;
    return timenow;
}

function refreshClock() {
    $("#clock p").replaceWith("<p>"+printTime()+"</p>");
}

/* Generic replacer */
function replacer(pid,cElem,newText) {
    $('#'+ pid + ' '+cElem).replaceWith("<"+cElem+">"+newText+"</"+cElem+">");
}

/* LINEAR PROCESS */

function checkGame() {
    window.turns = 0;
    $(document).ready(function() {
        $('#myContent').html('Hello World');
    });
    window.correctNumber = getRandomInt(1,100);
    setInterval(refreshClock, 1000);
    window.playerOne = new player();
    //If there is web storage data, remove submit button and process
    var storedPlayer = localStorage.getItem("playerOne");
    if (storedPlayer !==null) {
        storedPlayer=JSON.parse(storedPlayer);
        playerOne.playerize(storedPlayer);
        playGame(playerOne);
    }
    else {
        // otherwise wait for getName - submit new name
        alert("First Game! Enter name, press Start Game.");
    }
}

function getName(player) {
    /* obtain name from input box, hide submit button */
    var nameEntered = document.getElementById('pName');
    var pName = trim(nameEntered.value);
    $("#submitName").hide();
    player.setName(pName);
    welcomeText = "Game Is On, "+player.name+"! Enter your first guess.";
     /* replace input box with welcome */
    replacer("player","p",welcomeText);
}

function playGame(player) {
    /* Welcomes player by name and game number, waits for guess. */
    $("#submitName").hide();
    gamesLength = player.games.length+1;
    welcomeText = "Game "+gamesLength+" on, "+player.name+"! Enter your first guess.";
     /* replace input box with welcome */
    replacer("player","p",welcomeText);
}

function newGuess(player,correct) {
    turns ++;
    var guess = document.getElementById('pGuess').value;
    replacer("guess","input","");
    replacer("playTurns","p",turns);
    if (isNaN(guess) !== true) {
        if (guess==correct) { 
                /* store game statistics */
                $("#submitGuess").hide();
                $("#highLow").hide();
                player.addGame(turns);
                player.avgGuessCount();
                alert("Correct guess, "+player.name+"! In "+turns+" turns.");
                endGame(player);
            }
        else if (guess>correct) { 
            feedback="Hint: Try a lower number!";
            fbcolor="red";
            if (guess==999) {
                /* Shortcut */
                alert("Correct Number is "+correctNumber);
            }
        }
        else {
                feedback="Hint: Try a higher number!";
                fbcolor="green";
        }
        replacer("feedback","p",feedback);
        $("#feedback p").attr('style','color:'+fbcolor+";");
        }
    else {
        alert("Game ended per user input.");
    }
}

function endGame(player) {
    gamesLength = player.games.length;
    alert("Your average over "+gamesLength+" games is now "+player.avgGuess+".");
    var playAgain = 'y';
    playAgain = prompt("Would you like to play again? (y or n)");
    if (playAgain ==="y") {
        /* set web storage using JSON */
        localStorage.setItem("playerOne", JSON.stringify(player));
        window.location.reload();
        }
    else {
        alert("Hope you had fun!");
    }
}