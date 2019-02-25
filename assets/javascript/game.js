var topic = [
  {
    name: "BASEBALL",
    choices: [
      "batter",
      "pitcher",
      "umpire",
      "manager",
      "inning",
      "world series"
    ]
  },
  {
    name: "BASKETBALL",
    choices: [
      "shoot",
      "foul",
      "ref",
      "freethrow",
      "three pointer",
      "final four"
    ]
  },
  {
    name: "FOOTBALL",
    choices: [
      "first down",
      "flag",
      "touchdown",
      "saftey",
      "feild goal",
      "super bowl"
    ]
  },
  {
    name: "HOCKEY",
    choices: [
      "goal",
      "ice rink",
      "penalty box",
      "puck",
      "slapshot",
      "stanley cup"
    ]
  }
];

var wordPlace = document.getElementById("computerWord");
var buttonGenerate = document.getElementById("generate");
var display = document.getElementById("demo");
var letterBank = document.getElementById("keyArray");
var winBox = document.getElementById("win");
var loseBox = document.getElementById("lose");
var chancesLeftBox = document.getElementById("chances");
var games = document.getElementById("Game");
var winSound = document.getElementById("myAudio");
var loseSound = document.getElementById("myAudioLose");
var theWord = "";
var hiddenWord = "";
var badletter = [];/**reset */
var typedLetters = [];/**reset */
var letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
var topicIndex = 0;
var choicesIndex = 0;
var ChancesLeft = 10;
var WinTotal = 0;
var LoseTotal = 0;
var gameTotal = 0;
var gameActive = false;

document.getElementById("generate").onclick = function () {
  gameTotal++;
  games.innerHTML = gameTotal;
  gameActive = true;
  wordGenerate()
};



function wordGenerate() {
  theWord = topic[topicIndex].choices[choicesIndex];
  display.innerHTML = "Start typing letters to try and figure out the word! Your current topic is: "+ topic[topicIndex].name;
  choicesIndex++;
  if (hiddenWord.includes("_") == true){
    LoseTotal++;
    loseBox.innerHTML = LoseTotal;
  }
  if (choicesIndex == topic[topicIndex].choices.length) {
    topicIndex++;
    choicesIndex = 0;
  };
  ChancesLeft = 10;
  badletter = [];
  typedLetters = [];
  letterBank.textContent = badletter;
  buttonGenerate.textContent = "Pick New Word";
  
  LoadhiddenWord();
  gameStatus();
};

function LoadhiddenWord() {
  hiddenWord = "";
  for (thewordIndex = 0; thewordIndex < theWord.length; thewordIndex++) {
    if (typedLetters.includes(theWord[thewordIndex]) == true) {
      hiddenWord = hiddenWord + theWord[thewordIndex] + " ";
    }
    else {
      hiddenWord = hiddenWord + "_ "
    };
  };
  wordPlace.innerHTML = hiddenWord;
};
//displays keys on screen and adds then to usedLetters array


document.onkeyup = function (event) {
  if (gameActive == true) {
    var userGuess = event.key;
    if (typedLetters.includes(userGuess) == true) {
      alert("you've typed that already");
    } else {
      typedLetters.push(userGuess);
      if (theWord.includes(userGuess) == false) {
        badletter.push(userGuess);
        letterBank.textContent = badletter;
        console.log(typedLetters);
        ChancesLeft--;
      };
    };
    LoadhiddenWord();
    gameStatus();
  };
};

function gameStatus() {
  if (hiddenWord.includes("_") == false) {
    WinTotal++
    gameActive = false;
    winSound.play();
    alert("YAY YOU WIN!!!!");
   
  };
  winBox.innerHTML = WinTotal;
  if (ChancesLeft === 0) {
    LoseTotal++;
    loseBox.innerHTML = LoseTotal;
    gameActive = false;
    loseSound.play();
    alert("I'm Sorry you lost. Try Again?");
  }
  chancesLeftBox.innerHTML = ChancesLeft;
};


