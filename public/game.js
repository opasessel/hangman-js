const puzzleEl = document.querySelector("#puzzle");
const guessEl = document.querySelector("#guesses");
const unguessedEl = document.querySelector("#unguessed_letters");
const unguessedHeaderEl = document.querySelector("#unguessed_header");
const guessedButtonEl = document.querySelector("#switch_letters");

let puzzle1;
let remainingToggle = true;

window.addEventListener("keypress", (e) => {
	puzzle1.makeGuess(e.key);
	puzzle1.updateStatus();
	render()
});

guessedButtonEl.addEventListener("click", (e) => {
	remainingToggle = !remainingToggle;
	render()
})

const render = () => {
	puzzleEl.textContent = puzzle1.puzzle;
	guessEl.textContent = puzzle1.statusMessage;

	if (!remainingToggle) {
		unguessedHeaderEl.textContent = "Remaining Letters:"
		guessedButtonEl.textContent = "Switch to Guessed Letters"
		if (puzzle1.guessedLetters.length > 0 ) {
			unguessedEl.textContent = "abcdefghijklmnopqrstuvwxyz".split("").filter( function( el ) {
				return puzzle1.guessedLetters.indexOf( el ) < 0;
			} ).join(" ");
		} else {
			unguessedEl.textContent = "a b c d e f g h i j k l m n o p q r s t u v w x y z"
		}
	} 
	else {
		unguessedHeaderEl.textContent = "Guessed Letters:"
		guessedButtonEl.textContent = "Switch to Remaining Letters"
		if (puzzle1.guessedLetters.length > 0 ) {
			unguessedEl.textContent = puzzle1.guessedLetters.filter( function( el ) {
				return puzzle1.word.indexOf( el ) < 0;
			} ).join(" ");
			// unguessedEl.textContent = puzzle1.guessedLetters.sort().join(" ")
		} else {
			unguessedEl.textContent = "None yet!"
		}
	}
};

const startGame = async () => {
	const puzzle = await getPuzzle("2");
	puzzle1 = new Hangman(puzzle, 5);
	render();
	puzzle1.updateStatus();
};

document.querySelector("#reset").addEventListener("click", startGame);

startGame();