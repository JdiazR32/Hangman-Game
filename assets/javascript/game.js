
var availableLetters = "abcdefghijklmnopqrstuvwxyz";
function startgame() {
	words = ["earth", "mars", "venus", "jupiter", "saturn", "uranus", "neptune", 'mercury'];
	lives = 5;
	messages = {
		win: 'You win!',
		lose: 'Game over!',
		guessed: ' already guessed, please try again...',
		validLetter: 'Please enter a letter from A-Z'
	};
	lettersGuessed = lettersMatched = '';
	numLettersMatched = 0;
	currentWord = words[Math.floor(Math.random() * words.length)];

	outcome = document.getElementById("outcome");
	man = document.getElementById("lives-left");
	man.innerHTML = 'You have ' + lives + ' guesses remaining';
	outcome.innerHTML = '';
	letters = document.getElementById("letters");
	letters.innerHTML = '<li class="current-word">Current word:</li>';

	var letter, i;
	for (i = 0; i < currentWord.length; i++) {
		letter = '<li class="letter letter' + currentWord.charAt(i).toUpperCase() + '">' + currentWord.charAt(i).toUpperCase() + '</li>';
		letters.insertAdjacentHTML('beforeend', letter);
	};

};
function gameOver(win) {
	if (win) {
		outcome.innerHTML = messages.win;
		outcome.classList.add('win');
	} else {
		outcome.innerHTML = messages.lose;
		outcome.classList.add('error');
	};
};
document.getElementById("restart").onclick = startgame;

window.onload = startgame();
document.onkeyup = function (e) {
	userGuess = e.key;
	if (e.key) {
		if (availableLetters.indexOf(e.key) > -1) {

			if ((lettersMatched && lettersMatched.indexOf(e.key) > -1) || (lettersGuessed && lettersGuessed.indexOf(e.key) > -1)) {
				outcome.innerHTML = '"' + e.key.toUpperCase() + '"' + messages.guessed;
				outcome.classList.add("warning");
			}

			else if (currentWord.indexOf(e.key) > -1) {
				var lettersToShow;
				lettersToShow = document.getElementsByClassName("letter" + e.key.toUpperCase());

				for (var i = 0; i < lettersToShow.length; i++) {
					lettersToShow[i].classList.add("correct");
					// lettersToShow[i].appendChild("<li>");
				}


				for (var j = 0; j < currentWord.length; j++) {
					if (currentWord.charAt(j) === e.key) {
						numLettersMatched += 1;
					}
				}

				lettersMatched += e.key;
				if (numLettersMatched === currentWord.length) {
					gameOver(true);
				}
			}

			else {
				lettersGuessed += e.key;
				lives--;
				man.innerHTML = 'You have ' + lives + ' lives remaining';
				if (lives === 0) gameOver();
			}
		}

		else {
			outcome.classList.add('error');
			outcome.innerHTML = messages.validLetter;
		}
	};


};

