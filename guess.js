/* Main Sequence */

function getRandomInt(min,max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function initialize() {
    //If there is web storage data, remove submit button and process
    var storedPlayer = localStorage.getItem("playerOne");
    if (storedPlayer !==null) {
        storedPlayer=JSON.parse(storedPlayer);
        playerOne.playerize(storedPlayer);
        secondGame(playerOne);
    }
    else {
        alert("First Game! Enter name, press Start Game.");
    }
    // otherwise wait for submit of new name
}

function getName(player) {
    /* obtain name from input box, hide submit button */
    var nameEntered = document.getElementById('pName');
    var pName = trim(nameEntered.value);
    hideID("submitName");
    player.setName(pName);
    welcomeText = "Game Is On, "+player.name+"!";
     /* replace input box with welcome */
    replacer("player","p","playName",welcomeText,"bigtext");
}


function hideID(hsid) {
    var target = document.getElementById(hsid);
    var vis = target.style;
    /* Style changer use http://www.w3schools.com/jsref/dom_obj_style.asp */
    vis.display="none";
}

function player() {
    /* create player object */
    this.name = "";
    this.games = []; /* Create array */
    this.avgGuess=0;
    this.playerize = function(storedPlayer) {
        /* convert strings to numbers */
        this.name = storedPlayer.name;
        for(var i = 0; i < storedPlayer.games.length; i++ ){
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
        for( var i = 0; i < this.games.length; i++ ){
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
    // create replacement element
    var p=document.createElement("p");
    var node = document.createTextNode(printTime());
    p.appendChild(node);
    // define target
    var parent = document.getElementById("clock");
    var child = document.getElementById("timer");
    // replace element
    parent.replaceChild(p,child);
    p.setAttribute("id", "timer");
}

/* Generic replacer */
function replacer(pid,cElem,cid,newText,newid) {
    // create replacement element
    var nElem=document.createElement(cElem);
    var nNode = document.createTextNode(newText);
    nElem.appendChild(nNode);
    nElem.setAttribute("id",newid);
    // define target
    var parent = document.getElementById(pid);
    var child = document.getElementById(cid);
    // replace element
    parent.replaceChild(nElem,child);
    // re-assign ID
}

/* LINEAR PROCESS */

function newGuess(player) {
    turns ++;
    player=player;
    var currentGuess = document.getElementById('pGuess').value;
    replacer("guess","input","pGuess","","pGuess");
    replacer("playTurns","p","turns",turns,"turns");
    if (currentGuess == correctNumber) {
        hideID("submitGuess");
        hideID("highlow");
        player.addGame(turns);
        player.avgGuessCount();
        alert("Correct guess, "+player.name+"! In "+turns+" turns.");
        endGame(player);
    }
    else {
        if (isNaN(currentGuess) !== true) {
            if (currentGuess==999) {alert(correctNumber);}
            testGuess(currentGuess,correctNumber);
        }
        else {
            alert("Game ended per user input.");
        }
    }
}

/* Modified ELI */

function testGuess(guess,answer) {
    var currentGuess = guess;
    var correctNumber = answer;
    if (currentGuess > correctNumber) {
        feedback="Hint: Try a lower number!";
        fbcolor="red";
    }
    else {
        feedback="Hint: Try a higher number!";
        fbcolor="green";
    }
    replacer("feedback","p","highlow",feedback,"highlow");
    var target = document.getElementById("highlow");
    var fbstyle = target.style;
    fbstyle.color=fbcolor;
    /* Style changer use http://www.w3schools.com/jsref/dom_obj_style.asp */
}

function endGame(player) {
    gamesLength = player.games.length;
    alert("Your average over "+gamesLength+" games is now "+player.avgGuess+".");
    var playAgain = 'y';
    playAgain = prompt("Would you like to play again? (y or n)");
    if (playAgain =="y") {
        /* set web storage using JSON */
        localStorage.setItem("playerOne", JSON.stringify(player));
        window.location.reload();
        }
    else {
        alert("Hope you had fun!");
    }
}


function secondGame(player) {
    hideID("submitName");
    gamesLength = player.games.length+1;
    welcomeText = "Game "+gamesLength+" on, "+player.name+"!";
     /* replace input box with welcome */
    replacer("player","p","playName",welcomeText,"bigtext");
}