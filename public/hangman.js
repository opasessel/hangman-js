class Hangman {
	constructor(word, remainingGuesses) {
		this.word = word.toLowerCase().split("");
		this.remainingGuesses = remainingGuesses;
		this.guessedLetters = [];
		this.status = "playing";
	}

	get puzzle() {
		let puzzle = "";
		this.word.forEach((letter) => {
			puzzle += this.guessedLetters.includes(letter) || letter == " " ? letter : "_";
		});
		return puzzle;
	}

	makeGuess(guess) {
		guess = guess.toLowerCase();
		if (!this.guessedLetters.includes(guess) && "abcdefghijklmnopqrstuvwxyz".includes(guess) && this.status == "playing") {
			this.guessedLetters.push(guess);
			this.guessedLetters.sort();
			if (!this.word.includes(guess)) {
				this.remainingGuesses--;
			}
		}
	}

	updateStatus() {
		if (this.status == "playing") {
			if (this.remainingGuesses <= 0) {
				this.status = "failed";
			}
			const complete = this.word.every((letter) => {
				return this.guessedLetters.includes(letter) || letter == " ";
			});
			if (complete) {
				this.status = "finished";
			}
		}
	}

	get statusMessage() {
		if (this.status == "failed") {
			return `Nice try! The word was "${this.word.join("")}".`;
		}
		if (this.status == "finished") {
			return "Great work! You guessed the word.";
		}
		if (this.status == "playing") {
			return `Guesses remaining: ${this.remainingGuesses}`;
		}
	}
}